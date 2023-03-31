/**
 * @typedef { 'human_capital' | 'timeline' | 'samara' | 'flows' | 'technology'} IdleApp
 */


export default ({app, store}, inject) => {
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
        const result = await app.$axios.$get(`/api/idle/${idleApp}/state/`)
        return result.state
      },
      /**
       * Get video and duration of idle app
       * @param {IdleApp} idleApp
       * @return {Promise<{current_video: string, video_duration: number}>}
       */
      getVideo: async (idleApp) => {
        return await app.$axios.$get(`/api/idle/${idleApp}/video/`)
      },
      /**
       * Set state of idle app
       * @param {IdleApp} idleApp
       * @param {boolean} idleState
       * @return {Promise<*>}
       */
      postState: async (idleApp, idleState) => {
        const result = await app.$axios.$post(`/api/idle/${idleApp}/`, {state: idleState})
        return result.state
      }
    },
    timeline: {
      /**
       * Get current year
       * @return {Promise<number>}
       */
      getYear: async () => {
        return (await app.$axios.$get(`/api/timeline/year/`)).year
      },
      /**
       * Set current year
       * @param {number|string} year
       * @return {Promise<any>}
       */
      postYear: async (year) => {
        return await app.$axios.$post(`/api/timeline/year/`, {year})
      },
      /**
       * Get current video
       * @param {number|string} year
       * @param {number|string} videoIndex 1 or 2
       * @return {Promise<{current_video: string, video_duration: number, intro_video: string, intro_video_duration: number}>}
       */
      getVideo: async (year, videoIndex) => {
        return await app.$axios.$get(`/api/timeline/${year}/${videoIndex}/`)
      }
    },
    flows: {
      /**
       * Get flows
       * @return {Promise<string>} binary mask of flows
       */
      getFlows: async () => {
        return (await app.$axios.$get(`/api/flows/`)).mask
      },
      postFlow: async (flow, condition) => {
        return await app.$axios.$post(`/api/flows/`, {flow, condition})
      }
    },
    samara: {
      /**
       * Get current stage
       * @return {Promise<number>}
       */
      getStage: async () => {
        return Number.parseInt((await app.$axios.$get(`/api/area_samara/stage/`)).stage)
      },
      /**
       * Set current stage
       * @param {number | string} stage
       * @return {Promise<any>}
       */
      postStage: async (stage) => {
        return await app.$axios.$post(`/api/area_samara/stage/`, {stage})
      },
      /**
       * Get current video
       * @param {number|string}stage
       * @return {Promise<{current_video: string, video_duration: number}>}
       */
      getVideo: async (stage) => {
        return await app.$axios.$get(`/api/area_samara/${stage}/video/`)
      },
      /**
       * Get autoplay
       * @return {Promise<boolean>}
       */
      getAutoPlay: async () => {
        const newVar = await app.$axios.$get(`/api/area_samara/auto_play/`);
        console.warn(newVar)
        return newVar.auto_play
      },
      /**
       * Set autoplay
       * @param {boolean}autoPlay
       * @return {Promise<any>}
       */
      postAutoPlay: async (autoPlay) => {
        return await app.$axios.$post(`/api/area_samara/auto_play/`, {condition: autoPlay})
      }
    }
  })
}
