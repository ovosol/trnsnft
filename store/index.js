// import { keys, of } from 'core-js/core/array'
import createCache from 'vuex-cache'

function importAll(r) {
  r = r.keys().map((path) => r(path))
  return r
}
const setByPath = (obj, path, value) => {
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []; 
  path.slice(0,-1).reduce((a, c, i) => 
       Object(a[c]) === a[c] 
           ? a[c] 
           : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                 ? [] 
                 : {}, 
       obj)[path[path.length-1]] = value; 
  return obj; 
};


export const plugins = [createCache()]

export const state = () => ({
  samara: {
    map: require('~/assets/picture/samara/map.png'),
    counter: 0,
    start: false,
    idle: false,
  },
  technology: {
    period: 'past',
    models: [
      {
        model: 0,
        desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
        link: 'model_controller',
        name: 'Устройство для безогневой резки труб',
        jpgs: importAll(require.context('/static/models/PUIPG/', false, /.*\.jpg$/)),
      },
      {
        model: 1,
        desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
        link: 'model_controller',
        name: 'Установка для плоскосворачиваемого рукава',
        jpgs: importAll(require.context('/static/models/TPGS/', false, /.*\.jpg$/)),
      },
      {
        model: 2,
        desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
        link: 'model_controller',
        name: 'Установка ледорезная',
        jpgs: importAll(require.context('/static/models/UL/', false, /.*\.jpg$/)),
      },
      {
        model: 3,
        desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
        link: 'model_controller',
        name: 'Герметизирующее устройство для вантуза трубопровода',
        jpgs: importAll(require.context('/static/models/PUIPG/', false, /.*\.jpg$/)),
      },
    ],
  },
  smallTablet: {
    modelIndex: null,
    modelValue: 1,
  },
  timeline: {
    pause: false,
  },
})
export const getters = {
  byPath: (state) => (some) => {
    console.log('from getter', some);
    return some.
      replace(/\[/g, '.').
      replace(/\]/g, '').
      split('.').
      reduce((o, k) => (o || {})[k], state);
  },
}
export const actions = {
  
}

export const mutations = {
  CHANGE_BY_PATH(state, [path, value]) {
    console.log(path, value);
    setByPath(state, path, value)
  },
  CHANGE_SAMARA_VIDEO(state, counter) {
    if (state.samara.start && state.samara.counter === 3) {
      state.samara.counter = 0
      state.samara.start = !state.samara.start
    } else {
      state.samara.counter = counter
    }
  },
  // CHANGE_TIMELINE_VIDEO(state, counter) {
  //   if (!state.timeline.pause) {
  //     state.timeline.pause = false
  //   }
  //   if (state.timeline.counter === 7) {
  //     state.timeline.counter = 0

  //   } else {
  //     state.timeline.counter = counter
  //   }
  // },
  
}
