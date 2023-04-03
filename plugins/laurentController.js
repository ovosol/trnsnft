const laurentPwd = process.env.LAURENT_PWD || "Laurent"

export default ({app, store, $axios, $laurent}, inject) => {
  const getUrl = async (url, timeout = 3000) => {
    try {
      await $axios.get(url, {
        timeout,
        withCredentials: false,
      })
    } catch (e) {
      console.warn("Cannot send to ", url, e)
    }
  }

  /**
   * @typedef laurentAppName
   * @readonly
   * @enum {string}
   */
  const appName = {
    'Timeline': 'timeline',
    'Light': 'light',
    'Flows': 'flows'
  }

  /**
   * @param {laurentAppName} app
   */
  const getAddressForApp = (app) => {
    switch (app) {
      case appName.Timeline:
        return "192.168.1.2"
      case appName.Light:
        return "192.168.1.10"
      case appName.Flows:
        return "192.168.1.3"
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
     * Change one relay state
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
    /**
     * Change one out state
     * @param {laurentAppName} app
     * @param {number} out number of relay from 1 to 8 or 12
     * @param {number} state 0 off, 1 on, 2 invert
     * @return {Promise<void>}
     */
    sendOut: async (app, out, state) => {
      const ip = getAddressForApp(app)
      const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=WR,${out},${state}`
      await getUrl(url)
    },
    /**
     * Change all out state
     * @param {laurentAppName} app
     * @param {string} state - 12 character string with 0 (off), 1 (on), 2 (inverse), x (skip). Left to right
     * @return {Promise<void>}
     */
    sendOutAll: async (app, state) => {
      const ip = getAddressForApp(app)
      const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=WRA,${state}`
      await getUrl(url)
    }
  })
}
