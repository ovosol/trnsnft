import axios from "axios";

const laurentPwd = process.env.LAURENT_PWD || "Laurent"

/**
 * @readonly
 * @enum {string}
 */
const appName = {
  'Timeline': 'timeline',
  'Light': 'light',
  'Flows': 'flows',
  'Samara': 'samara',
  'Technology': 'technology',
}

const thingsPerApp = {
  [appName.Light]: {relays: 12},
  [appName.Samara]: {relays: 8, outs: 8},
}

const getUrl = async (url, timeout = 100) => {
  try {
    await axios.get(url, {
      timeout,
    })
  } catch (e) {
    console.warn("Cannot send to ", url, e)
  }
}

const throwIfWrongCharacters = (state) => {
  if (state.match(/[^012x]/)) {
    throw new Error(`Wrong state: ${state}, only 0, 1, 2, x allowed`)
  }
}

/**
 *
 * @param {appName} app
 * @param {string} state 12 character string with 0 (off), 1 (on), 2 (inverse), x (skip). Left to right
 * @return {Promise<void>}
 */
const setAllRelays = async (app, state) => {
  throwIfWrongCharacters(state)
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=REL,ALL,${state}`
  await getUrl(url)
}

const setAllOuts = async (app, state) => {
  throwIfWrongCharacters(state)
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=OUT,ALL,${state}`
  await getUrl(url)
}

/**
 *
 * @param {appName} app
 * @param {number} relay number of relay from 1 to 8 or 12. 0 to disable all
 * @param {Array<number> || null} skip relays to skip, from 1 to 8 or 12
 * @return {Promise<void>}
 */
const setOneRelayOn = async (app, relay, skip = null) => {
  let mask = Array(12).fill(0)
  if (relay >= 1 && relay <= 12) {
    mask[relay - 1] = 1
  }
  
  if (skip) {
    for (const s of skip) {
      if (s < 1 || s > 12) {
        throw new Error(`Wrong relay number: ${s}, should be from 1 to 12`)
      }
      mask[s - 1] = 'x'
    }
  }

  const maskStr = mask.join('')
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=REL,ALL,${maskStr}`
  await getUrl(url)
}

/**
 *
 * @param {appName} app
 * @param {number} relay number of relay from 1 to 8 or 12
 * @param {number} state 0 off, 1 on, 2 invert
 * @returns {Promise<void>}
 */
const sendRelay = async (app, relay, state) => {
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=REL,${relay},${state}`
  await getUrl(url)
}

/**
 * Change one out state
 * @param {appName} app
 * @param {number} out number of relay from 1 to 8 or 12
 * @param {number} state 0 off, 1 on, 2 invert
 * @return {Promise<void>}
 */
const sendOut = async (app, out, state) => {
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=WR,${out},${state}`
  await getUrl(url)
}
/**
 * Change all out state
 * @param {appName} app
 * @param {string} state - 12 character string with 0 (off), 1 (on), 2 (inverse), x (skip). Left to right
 * @return {Promise<void>}
 */
export const sendOutAll = async (app, state) => {
  throwIfWrongCharacters(state)
  const ip = getAddressForApp(app)
  const url = `http://${ip}/cmd.cgi?psw=${laurentPwd}&cmd=WRA,${state}`
  await getUrl(url)
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
    case appName.Flows:
      return "192.168.1.3"
    case appName.Samara:
      return "192.168.1.4"
    case appName.Technology:
      return "192.168.1.5"
    default:
      throw new Error(`Unknown app name: ${app}`)
  }
}

const samara = {
  /**
   *
   * @param {0|1|2}state
   * @return {Promise<void>}
   */
  changeLight: async (state) => {
    return await sendOut(appName.Samara, 5, state)
  },
  /**
   *
   * @param {1|2|3|4} stage
   * @param {0|1|2} state
   * @return {Promise<void>}
   */
  changeGroup: async (stage, state) => {
    return await sendRelay(appName.Samara, stage, state)
  },
  /**
   *
   * @param {string} state up to 12 characters with 0 (off), 1 (on), 2 (inverse), x (skip). Left to right. Example: '012x'
   * @return {Promise<void>}
   */
  changeAllGroups: async (state) => {
    await Laurent.setAllRelays(Laurent.appName.Samara, state)
  }
}

const technology = {
  /**
   *
   * @param {boolean} state
   * @return {Promise<void>}
   */
  move: async (state) => {
    // TODO change relay
  }

}


export const Laurent = {
  setOneRelayOn,
  sendRelay,
  sendOut,
  sendOutAll,
  appName,
  setAllRelays,
  setAllOuts,
  apps: {
    samara,
  },
  thingsPerApp
}
