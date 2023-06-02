// import { keys, of } from 'core-js/core/array'
import createCache from 'vuex-cache'

function importAll(r) {
  r = r.keys().map((path) => r(path))
  return r
}

const setByPath = (obj, path, value) => {
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];
  path.slice(0, -1).reduce((a, c, i) =>
      Object(a[c]) === a[c]
        ? a[c]
        : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
          ? []
          : {},
    obj)[path[path.length - 1]] = value;
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
        desc: 'Машина для безогневой резки труб (далее по тексту Машина) предназначена для резки труб диаметром от 219 до 820 мм лезвийным режущим инструментом с одновременной разделкой кромок под сварку. Применяется для выполнения работ по вырезке дефектных участков трубопроводов и линейной арматуры при истечении нефти без избыточного давления и предварительного опорожнения трубы. Машина выпускается как с электрическим, так и с пневматическим приводом. Управление работой машин осуществляется с помощью дистанционного пульта управления.\n' +
          'Машина эксплуатируется во взрывоопасных зонах В-1Г, в условиях умеренного климата (исполнение У) категории размещения 1 по ГОСТ 15150-69. Машина сертифицирована в системе сертификации ГОСТ Р и разрешена к применению Госгортехнадзором России.',
        link: 'model_controller',
        name: 'Устройство для безогневой резки труб',
        imagesBig: importAll(require.context('/static/models/VOLZH/', false, /.*\.png$/)),
        imagesSmall: importAll(require.context('/static/modelsSmall/VOLZH/', false, /.*\.png$/)),
      },
      {
        model: 1,
        desc: 'Предназначена для перекачки нефтепродуктопроводов, нефти, воды, заполнения и опорожнения магистральных нефтепроводов и нефтепродуктопроводов.\n' +
          'Трубопроводы состоят из: \n' +
          '- трубопровода в количестве от 1 до 5 шт;\n' +
          '- установки сворачивания и разворачивания;\n' +
          '- барабана.\n' +
          'Трубопровод из гибких плоскосворачиваемых предназначена для эксплуатации в макроклиматических районах с умеренным и холодным климатом (климатическое исполнение У, ХЛ, УХЛ ГОСТ 15150), категория размещения 1 по ГОСТ 15150.\n' +
          'Трубопровод из гибких плоскосворачиваемых рукавов предназначен для перекачки нефтепродуктопроводов, нефти, воды, заполнения и опорожнения магистральных нефтепроводов и нефтепродуктопроводов организаций системы «Транснефть» при проведении плановых и аварийных работ.\n',
        link: 'model_controller',
        name: 'Установка для плоскосворачиваемого рукава',
        imagesBig: importAll(require.context('/static/models/TPGS/', false, /.*\.png$/)),
        imagesSmall: importAll(require.context('/static/modelsSmall/TPGS/', false, /.*\.png$/)),
      },
      {
        model: 2,
        desc: 'Предназначена для прорезания каналов в ледовом покрове водоемов (класс «мерзлые», подкласс «ледяные» ГОСТ 25100) при проведении технологических операций по предупреждению, диагностике и ликвидации последствий аварий на подводных переходах нефтепроводов в зимний период.\n' +
          'Установка ледорезная предназначена для эксплуатации в макроклиматических районах с умеренным климатом (климатическое исполнение У ГОСТ 15150), категория размещения 1 по ГОСТ 15150.\n',
        link: 'model_controller',
        name: 'Установка ледорезная',
        imagesBig: importAll(require.context('/static/models/UL/', false, /.*\.png$/)),
        imagesSmall: importAll(require.context('/static/modelsSmall/UL/', false, /.*\.png$/)),
      },
      {
        model: 3,
        desc: 'Приспособление предназначено для установки и извлечения, с применением запорной арматуры, герметизирующих пробок вантузов магистральных трубопроводов, соответствующих ОТТ-23.040.01-КТН-219-16, на остановленном нефтепроводе при статическом давлении в трубопроводе, не превышающем рабочее давление приспособления.\n' +
          'Приспособление эксплуатируется в условиях умеренного и холодного климата (исполнение УХЛ ГОСТ 15150), категории размещения 1 по ГОСТ 15150.\n' +
          'Принцип работы изделия заключается в линейном перемещении герметизирующей пробки, закрепленной на пиноли, при помощи гидравлического привода, через открытую задвижку, до посадочного места во фланце вантуза. \n',
        link: 'model_controller',
        name: 'Герметизирующее устройство для вантуза трубопровода',
        imagesBig: importAll(require.context('/static/models/PUIPG/', false, /.*\.png$/)),
        imagesSmall: importAll(require.context('/static/modelsSmall/PUIPG/', false, /.*\.png$/)),
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
    return some.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], state);
  },
}
export const actions = {}

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
