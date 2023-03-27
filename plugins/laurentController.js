import axios from "axios";

/**
 * @readonly
 * @enum {string}
 */
export const appName = {
  'Timeline': 'timeline',
  'Light': 'light',
}

export const setOneRelayOnLegacy = async (app, relay) => {
  for (let i = 1; i <= 12; i++) {
    sendRelay(app, i, i === relay ? 1 : 0).then()
  }
}

/**
 *
 * @param {appName} app
 * @param {number} relay number of relay from 1 to 8 or 12. 0 to disable all
 * @return {Promise<void>}
 */
export const setOneRelayOn = async (app, relay) => {
  let mask;
  if (relay < 1 || relay > 12) {
    // disable all
    mask = '0'.repeat(12)
  } else {
    // create relay mask from relay number with length 12
    mask = '0'.repeat(relay - 1) + '1' + '0'.repeat(12 - relay);
  }
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=Laurent&cmd=REL,ALL,${mask}`
  await getUrl(url)
}

/**
 *
 * @param {appName} app
 * @param {number} relay number of relay from 1 to 8 or 12
 * @param {number} state 0 off, 1 on, 2 invert
 * @returns {Promise<void>}
 */
export const sendRelay = async (app, relay, state) => {
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=Laurent&cmd=REL,${relay},${state}`
  await getUrl(url)
}

const getUrl = async (url) => {
  try {
    await axios.get(url, {timeout: 100})
  } catch (e) {
    console.warn("Cannot send to ", url, e)
  }
}

/**
 * @param {appName} app
 */
const getAddressForApp = (app) => {
  switch (app) {
    case appName.Timeline:
      return "192.168.1.2"
    case appName.Light:
      return "192.168.1.10"
    default:
      throw new Error(`Unknown app name: ${app}`)
  }

}
