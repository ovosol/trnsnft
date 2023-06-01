class Timeline {
  constructor(debug = false) {
    this.debug = debug
  }

  /**
   * @type {boolean}
   */
  debug;
  /**
   *
   * @type {number[]}
   */
  timeoutIds = []
  /**
   *
   * @type {Map<number, Function>}
   */
  actions = new Map()

  /**
   *
   * @param {number} time
   * @param {Function}action
   */
  addAction = (time, action) => {
    if (typeof action !== 'function') {
      throw new Error('action must be a function')
    }
    if (typeof time !== 'number') {
      throw new Error('time must be a number')
    }
    this.actions.set(time, action)
  }

  clearActions = () => {
    this.actions.clear()
  }

  start = () => {
    this.stop()
    const startTime = Date.now()
    const actionsSortedByKey = [...this.actions.keys()].sort((a, b) => a - b)

    for (let i = 0; i < actionsSortedByKey.length; i++) {
      const time = actionsSortedByKey[i]
      const action = this.actions.get(time)
      const timeoutId = setTimeout(() => {
        if (this.debug) {
          const elapsedTime = Date.now() - startTime
          console.log('Waypoint', i, elapsedTime)
          console.log('Timeline action', time)
        }
        action()
      }, time * 1000)
      this.timeoutIds.push(timeoutId)
    }
  }

  stop = () => {
    for (const timeoutId of this.timeoutIds) {
      clearTimeout(timeoutId)
    }
  }
}
