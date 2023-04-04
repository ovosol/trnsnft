/**
 * @typedef { 'human_capital' | 'timeline' | 'samara' | 'flows' | 'technology'} IdleApp
 */

const requestCache = {}

let a;

/**
 *
 * @param url
 * @return {Promise<*>}
 */
const getCached = async (url) => {
  return requestCached('get', url)
}

const postCached = async (url, data) => {
  return requestCached('post', url, data)
}

/**
 *
 * @param method
 * @param url
 * @param data
 * @return {Promise<*>}
 */
const requestCached = async (method, url, data = null) => {
  const cacheKey = method + url + JSON.stringify(data)

  try {
    const result = await a.$request({
      method,
      url,
      data,
    })
    requestCache[cacheKey] = result
    return result
  } catch (e) {
    console.log('Error in requestCached', e)
    if (requestCache[cacheKey]) {
      return requestCache[cacheKey]
    } else {
      throw e
    }
  }
}


export default ({app, store}, inject) => {
  a = app.$axios
  /**
   * @property {Object} $api
   */
  inject('api', {
    idle: {
      /**
       * Get state of idle app
       * @param {IdleApp} idleApp
       * @return {Promise<boolean>}
       */
      getState: async (idleApp) => {
        const result = await getCached(`/api/idle/${idleApp}/state/`)
        return result.state
      },
      /**
       * Get video and duration of idle app
       * @param {IdleApp} idleApp
       * @return {Promise<{current_video: string, video_duration: number}>}
       */
      getVideo: async (idleApp) => {
        return await getCached(`/api/idle/${idleApp}/video/`)
      },
      /**
       * Set state of idle app
       * @param {IdleApp} idleApp
       * @param {boolean} idleState
       * @return {Promise<*>}
       */
      postState: async (idleApp, idleState) => {
        const result = await postCached(`/api/idle/${idleApp}/`, {state: idleState})
        return result.state
      }
    },
    timeline: {
      /**
       * Get current year
       * @return {Promise<number>}
       */
      getYear: async () => {
        return (await getCached(`/api/timeline/year/`)).year
      },
      /**
       * Set current year
       * @param {number|string} year
       * @return {Promise<any>}
       */
      postYear: async (year) => {
        return await postCached(`/api/timeline/year/`, {year})
      },
      /**
       * Get current video
       * @param {number|string} year
       * @param {number|string} videoIndex 1 or 2
       * @return {Promise<{current_video: string, video_duration: number, intro_video: string, intro_video_duration: number}>}
       */
      getVideo: async (year, videoIndex) => {
        return await getCached(`/api/timeline/${year}/${videoIndex}/`)
      }
    },
    flows: {
      /**
       * Get flows
       * @return {Promise<string>} binary mask of flows
       */
      getFlows: async () => {
        return (await getCached(`/api/flows/`)).mask
      },
      postFlow: async (flow, condition) => {
        return await postCached(`/api/flows/`, {flow, condition})
      }
    },
    samara: {
      /**
       * Get current stage
       * @return {Promise<number>}
       */
      getStage: async () => {
        return Number.parseInt((await getCached(`/api/area_samara/stage/`)).stage)
      },
      /**
       * Set current stage
       * @param {number | string} stage
       * @return {Promise<any>}
       */
      postStage: async (stage) => {
        return await postCached(`/api/area_samara/stage/`, {stage})
      },
      /**
       * Get current video
       * @param {number|string}stage
       * @return {Promise<{current_video: string, video_duration: number}>}
       */
      getVideo: async (stage) => {
        return await getCached(`/api/area_samara/${stage}/video/`)
      },
      /**
       * Get autoplay
       * @return {Promise<boolean>}
       */
      getAutoPlay: async () => {
        const newVar = await getCached(`/api/area_samara/auto_play/`);
        return newVar.auto_play
      },
      /**
       * Set autoplay
       * @param {boolean}autoPlay
       * @return {Promise<any>}
       */
      postAutoPlay: async (autoPlay) => {
        return await postCached(`/api/area_samara/auto_play/`, {condition: autoPlay})
      }
    },
    humanCapital: {
      /** @typedef {Object} Employee
       * @property {number} id
       * @property {string} fio
       * @property {string} job
       * @property {string} description
       * @property {string} photo
       */
      /**
       *
       * @param {'fame' | 'veterans'} group
       * @return {Promise<{employees: Array<Employee>}>}
       */
      getEmployeeList: async (group) => {
        return await getCached(`/api/video_stand/employee_list/${group}/`)
      }
    }
  })
}
