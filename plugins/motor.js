import axios from "axios";

/**
 *
 * @param {'forward' | 'reverse' | 'stop'} command
 * @return {Promise<void>}
 */
export const setMotor = async (command) => {
  let url = "http://192.168.1.136:1880/motor?"
  switch (command) {
    case 'forward':
      url += "F"
      break;
    case 'reverse':
      url += "R"
      break;
    case 'stop':
      url += "S"
      break;
    default:
      throw new Error(`Unknown command ${command}, available commands: forward, reverse, stop`)

  }

  await axios.get(url)
}
