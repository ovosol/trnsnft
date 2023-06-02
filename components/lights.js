import {Laurent} from "@/plugins/laurentControllerLegacy";

/**
 * Object containing information about different lights.
 * @typedef {Object} LightInfo
 * @property {string} name - The name of the light.
 * @property {number[]} [relays] - An array of relay numbers associated with the light.
 * @property {number[]} [outs] - An array of output numbers associated with the light.
 * @property {Laurent.appName} app - The name of the app associated with the light.
 * @property {boolean} [mode] - The mode of the light. True for on, false for off.
 */

/**
 *
 * @type {Record<string, LightInfo>}
 */
export const lights = {
  "timeline": {
    name: "История",
    relays: [1, 4],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "technology": {
    name: "Технологии",
    relays: [3, 5],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "stream7": {
    name: "7 потоков нефти",
    relays: [3, 6],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "human_capital": {
    name: "Люди",
    relays: [2, 8],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "samara": {
    name: "Самара",
    relays: [3, 7],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "samara_table": {
    name: "Самара стол",
    outs: [5],
    app: Laurent.appName.Samara,
    exclusive: false
  },
  "backlight": {
    name: "Общий свет",
    relays: [12],
    app: Laurent.appName.Light,
    exclusive: false
  },
  "full": {
    name: "Весь свет",
    relays: [1, 2, 3, 4, 5, 6, 7, 8, 12],
    app: Laurent.appName.Light,
    exclusive: true
  }
}

/**
 *
 * @param lightName
 * @return {LightInfo}
 */
export const getLightInfo = (lightName) => {
  const [prefix, name, state] = lightName.split("-")
  const light = lights[name]
  if (state === "on")
    light.mode = true
  else if (state === "off")
    light.mode = false
  return light
}
