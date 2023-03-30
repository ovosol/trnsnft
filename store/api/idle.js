export const actions = {
  /**
   * @typedef { 'human_capital'| 'timeline'| 'samara'| 'flows'| 'technology'} IdleApp
   */

  /**
   * Get state of idle app
   * @param state
   * @param commit
   * @param {IdleApp} app
   * @return {Promise<boolean>}
   */
  async getState({state, commit}, app) {
    const result = await this.$axios.$get(`/api/idle/${app}/state/`)
    return result.state
  },

  /**
   * Get video and duration of idle app
   * @param state
   * @param commit
   * @param {IdleApp} app
   * @return {Promise<{current_video: string, video_duration: number}>}
   */
  async getVideo({state, commit}, app) {
    return await this.$axios.$get(`/api/idle/${app}/video/`)
  },

  /**
   * Set state of idle app
   * @param state
   * @param commit
   * @param {IdleApp} app
   * @param {boolean} idleState
   * @return {Promise<*>}
   */
  async postState({state, commit}, {app, idleState}) {
    console.log('!!! postState', app, idleState)
    const result = await this.$axios.$post(`/api/idle/${app}/`, {state: idleState})
    return result.state
  }
}
