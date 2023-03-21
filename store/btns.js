export const state = () => ({
  tablet: {
    main: [
      {
        link: 'humanCapital',
        name: 'Человеческий капитал',
      },
      {
        link: 'samara',
        name: 'Самара',
      },
      {
        link: 'technology',
        name: 'Технологии',
      },
      {
        link: 'timeline',
        name: 'Таймлайн',
      },
      {
        link: 'stream7',
        name: '7 потоков нефти',
      },
    ],
    stream7: [
      {
        link: 'colba',
        colba: 0,
        name: 'Первая колба',
      },
      {
        link: 'colba',
        colba: 1,
        name: 'Вторая колба',
      },
      {
        link: 'colba',
        colba: 2,
        name: 'Третья колба',
      },
      {
        link: 'colba',
        colba: 3,
        name: 'Четвертая колба',
      },
      {
        link: 'colba',
        colba: 4,
        name: 'Пятая колба',
      },
      {
        link: 'colba',
        colba: 5,
        name: 'Шестая колба',
      },
      {
        link: 'colba',
        colba: 6,
        name: 'Седьмая колба',
      },
    ],
    humanCapital: [
      {
        link: '-',
        name: 'Какаято кнопка',
      },
      {
        link: '-',
        name: 'Какаято кнопка',
      },
      {
        link: '-',
        name: 'Какаято кнопка',
      },
      {
        link: '-',
        name: 'Какаято кнопка',
      },
      {
        link: '-',
        name: 'Какаято кнопка',
      },
      {
        link: '-',
        name: 'Какаято кнопка',
      },
    ],
    samara: [
        {
          link: 'samaraButtons',
          stage: 1,
          name: 'Этап 1',
        },
        {
          link: 'samaraButtons',
          stage: 2,
          name: 'Этап 2',
        },
        {
          link: 'samaraButtons',
          stage: 3,
          name: 'Этап 3',
        },
        {
          link: 'samaraButtons',
          stage: 4,
          name: 'Этап 4',
        },
        {
          link: 'samaraButtons',
          stage: 'start',
          name: 'Пуск',
        },
      ],
    // samara: [
    //   {
    //       link: 'samaraButtons',
    //       name: 'Кнопки Самары',
    //     },
      
    // ],
    technology: [
        {
          status: 'past',
          link: 'changeScreenPosition',
          name: 'Прошлое',
        },
        {
          status: 'present',
          link: 'changeScreenPosition',
          name: 'Настоящее',
        },
        {
          status: 'present2',
          link: 'changeScreenPosition',
          name: 'Настоящее 2',
        },
        {
          status: 'future',
          link: 'changeScreenPosition',
          name: 'Будущее',
        },
      ],
    // technology: [
      
    //     {
    //       link: 'changeScreenPosition',
    //       name: 'Перемещение Экрана',
    //     },
    // ],
    timeline: [
        {
          link: 'changeYear',
          name: '1936',
        },
        {
          link: 'changeYear',
          name: '1953',
        },
        {
          link: 'changeYear',
          name: '1961',
        },
        {
          link: 'changeYear',
          name: '1970',
        },
        {
          link: 'changeYear',
          name: '1980s',
        },
        {
          link: 'changeYear',
          name: '1990s',
        },
        {
          link: 'changeYear',
          name: '2000s',
        },
        {
          link: 'changeYear',
          name: '2010s',
        }
      ],
    // timeline: [
    //     {
    //       link: 'changeYear',
    //       name: 'Переключение годов',
    //     },
    //   ],
      
  },
  smallTablet: {
    main: [
      {
        model: 0,
        link: 'model_controller',
        name: 'УСТРОИЙСТВО ДЛЯ БЕЗОГНЕВОЙ РЕЗКИ ТРУБ',
      },
      {
        model: 1,
        link: 'model_controller',
        name: 'УСТАНОВКА ДЛЯ <BR> ПЛОСКОСВОРАЧИВАЕМОГО РУКАВА',
      },
      {
        model: 2,
        link: 'model_controller',
        name: 'УСТАНОВКА ЛЕДОРЕЗНАЯ',
      },
      {
        model: 3,
        link: 'model_controller',
        name: 'ГЕРМЕТИЗИРУЮЩЕЕ УСТРОЙСТВО ДЛЯ <BR> ВАНТУЗА ТРУБОПРОВОДА',
      },
    ],
  },
  humanCapital: {
    main: [
      {
        link: 'humankind',
        name: 'Человеческий <br> капитал',
      },
      {
        link: 'social',
        name: 'Социальная <br> политика',
      },
      {
        link: 'person',
        name: 'Кадровая <br> политика',
      },
      {
        link: 'ecology',
        name: 'Энергоэффективность <br> экология <br> Охрана труда',
      },
      {
        link: 'charity',
        name: 'Благотворительность',
      },
    ],
    humankind: [
      {
        link: 'honor_book',
        name: 'Книга почета',
      },
      {
        link: 'veteran_book',
        name: 'Книга памяти ветеранов ВОВ',
      },
    ],
    person: [
      {
        link: 'vuz',
        name: 'Взаимодействие с вузами',
      },
    ],
    ecology: [
      {
        link: 'labour_protection',
        name: 'Охрана труда',
      },
      {
        link: 'energy_effiency',
        name: 'Энергоэффетивность',
      },
      {
        link: 'ecology_security',
        name: 'Промышленная и экологическая безопасность',
      },
    ],
    charity: [
      {
        link: 'privolga',
        name: 'проекты АО «Транснефть – Приволга» в областях благотворительности',
      },
      {
        link: 'marathone',
        name: 'благотворительный марафон "Помогаем добрым делом"',
      },
    ],
    social: [
      {
        link: 'resort',
        name: 'Санаторно-курортное и реабилитационное-восстановительное лечения',
      },
      {
        link: 'insurance',
        name: 'Добровольное медицинское страхование',
      },
      {
        link: 'mortgage',
        name: 'Жилищная ипотека',
      },
      {
        link: 'pension',
        name: 'Негосударственное пенсионное обеспечение',
      },
      {
        link: 'social-sport',
        name: 'Мероприятия, направленные на развитие физической культуры и спорта',
      },
      {
        link: 'benefits',
        name: 'социальные льготы и гарантии',
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

export const mutations = {}

export const actions = {}
