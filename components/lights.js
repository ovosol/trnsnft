import {Laurent} from "@/plugins/laurentControllerLegacy";

/**
 * Object containing information about different lights.
 * @typedef {Object} LightInfo
 * @property {string} name - The name of the light.
 * @property {number[]} [relays] - An array of relay numbers associated with the light.
 * @property {number[]} [outs] - An array of output numbers associated with the light.
 * @property {Laurent.appName} app - The name of the app associated with the light.
 * @property {boolean} exclusive - Whether the light is exclusive (only one light can be on at a time).
 */

/**
 *
 * @type {Record<string, LightInfo>}
 */
export const lights = {
  "timeline": {
    name: "История",
    relays: [1,4],
    app: Laurent.appName.Light,
    exclusive: true
  },
  "technology": {
    name: "Технологии",
    relays: [3,5],
    app: Laurent.appName.Light,
    exclusive: true
  },
  "stream7": {
    name: "7 потоков нефти",
    relays: [3,6],
    app: Laurent.appName.Light,
    exclusive: true
  },
  "human_capital": {
    name: "Человеческий капитал",
    relays: [2,8],
    app: Laurent.appName.Light,
    exclusive: true
  },
  "samara": {
    name: "Самара",
    relays: [3,7],
    app: Laurent.appName.Light,
    exclusive: true
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
    exclusive: true
  },
  "full": {
    name: "Весь свет вкл",
    relays: [1,2,3,4,5,6,7,8,12],
    app: Laurent.appName.Light,
    exclusive: true
  },
  "off": {
    name: "Весь свет выкл",
    relays: [],
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
  lightName = lightName.replace(/light-/, "")
  return lights[lightName]
}
