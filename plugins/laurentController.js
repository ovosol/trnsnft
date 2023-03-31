const laurentPwd = process.env.LAURENT_PWD || "Laurent"

export default ({app, store, $axios, $laurent}, inject) => {
  const getUrl = async (url, timeout = 1000) => {
    try {
      await $axios.get(url, {timeout})
    } catch (e) {
      console.warn("Cannot send to ", url, e)
    }
  }

  /**
   * @typedef laurentAppName
   * @readonly
   * @enum {string}
   */
  const appName= {
    'Timeline': 'timeline',
    'Light': 'light',
  }

  /**
   * @param {laurentAppName} app
   */
  const getAddressForApp= (app) => {
    switch (app) {
      case appName.Timeline:
        return "192.168.1.2"
      case appName.Light:
        return "192.168.1.10"
      default:
        throw new Error(`Unknown app name: ${app}`)
    }
  }

  /**
   * @property {Object} $laurent
   */
  inject('laurent', {
    /**
     * @typedef laurentAppName
     * @readonly
     * @enum {string}
     */
    appName: appName,

    setOneRelayOnLegacy: async (app, relay) => {
      for (let i = 1; i <= 12; i++) {
        await this.sendRelay(app, i, i === relay ? 1 : 0)
      }
    },
    /**
     *
     * @param {laurentAppName} app
     * @param {number} relay number of relay from 1 to 8 or 12. 0 to disable all
     * @return {Promise<void>}
     */
    setOneRelayOn: async (app, relay) => {
      let mask;
      if (relay < 1 || relay > 12) {
        // disable all
        mask = '0'.repeat(12)
      } else {
        // create relay mask from relay number with length 12
        mask = '0'.repeat(relay - 1) + '1' + '0'.repeat(12 - relay);
      }
      const ip = getAddressForApp(app)
      const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=REL,ALL,${mask}`
      await getUrl(url)
    },
    /**
     *
     * @param {laurentAppName} app
     * @param {number} relay number of relay from 1 to 8 or 12
     * @param {number} state 0 off, 1 on, 2 invert
     * @returns {Promise<void>}
     */
    sendRelay: async (app, relay, state) => {
      const ip = getAddressForApp(app)
      const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=REL,${relay},${state}`
      await getUrl(url)
    },
  })
}
