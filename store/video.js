// import { keys, of } from 'core-js/core/array'
import createCache from 'vuex-cache'

export const plugins = [createCache()]

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

export const state = () => ({
  addr: 'http://127.0.0.1:8000',
  entryGroup: {
    right: require('/static/video/entry_group/1.mp4'),
  },
  samara: {
    video: [
      {
        src: require('/static/video/samara/1.mp4'),
        endTime: 20,
      },
      {
        src: require('/static/video/samara/2.mp4'),
        endTime: 15,
      },
      {
        src: require('/static/video/samara/3.mp4'),
        endTime: 23,
      },
      {
        src: require('/static/video/samara/3.mp4'),
        endTime: 23,
      },
    ]
  },
  technology: {
    fixed: [
      require('/static/video/technology/past/1.mp4'),
      require('/static/video/technology/present/1.mp4'),
      require('/static/video/technology/present/1.mp4'),
      require('/static/video/technology/future/1.mp4'),
    ],
    moving: [
      require('/static/video/technology/past/2.mp4'),
      require('/static/video/technology/present/2.mp4'),
      require('/static/video/technology/present/1.mp4'),
      [
        {
          title: 'Do minim id quis nisi commodo esse aute proident occaecat.',
          desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
          img: require('~/assets/picture/1.jpg'),
        },
        {
          title: 'Do minim id quis nisi commodo esse aute proident occaecat.',
          desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
          img: require('~/assets/picture/2.jpg'),
        },
        {
          title: 'Do minim id quis nisi commodo esse aute proident occaecat.',
          desc: 'Minim laborum ipsum ut aliquip velit. Sunt adipisicing ad sunt sit officia dolore excepteur irure voluptate fugiat laborum veniam. Consectetur tempor pariatur dolor deserunt consequat.',
          img: require('~/assets/picture/3.jpg'),
        },
      ],
    ],
  },
  timeline: {
    video: [
      {
        year: '1936',
        video1: null,
        video2: null,
      },
      {
        year: '1953',
        video1: null,
        video2: null,
      },
      {
        year: '1961',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '1970',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '1974',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '1979',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '1980',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '1990',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '2000',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
      {
        year: '2010',
        video1: require('/static/video/samara/1.mp4'),
        video2: require('/static/video/samara/2.mp4'),
      },
    ],
    
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
  // async getTimelineVideo({ state, commit }, endpoint) {
  //   console.log(endpoint, 'endpoint action');
  //   let video = await this.$axios.$get(state.addr + endpoint);
  //   let splitted = endpoint.split('/');
  //   let index = state.timeline.video.map(function(v) {
  //     return v.year;
  //   }).indexOf(splitted[2]);
  //   let path = 'timeline.video.' + index +'.video' + splitted[3];
  //   console.log(path, index, year, video);
  //   // state.timeline.video.find(video => video.year === year).id = 123 

  //   commit('CHANGE_BY_PATH',[ path, state.addr + video.current_video])
  // },
}

export const mutations = {
  CHANGE_BY_PATH(state, [path, value]) {
    setByPath(state, path, value)
  },
 
}
// {{endpoint}}/timeline/:year/:video