export const state = () => ({
  tablet: {
    main: [
      {
        link: 'timeline',
        name: 'История',
      },
      {
        link: 'technology',
        name: 'Технологии',
      },
      {
        link: 'stream7',
        name: '7 потоков нефти',
      },
      {
        link: 'samara',
        name: 'Самара',
      },
      {
        link: 'humanCapital',
        name: 'Люди',
      },
      {
        link: 'light',
        name: 'Свет',
      }
    ],
    light: [
      {
        link: 'light-timeline-on',
      },
      {
        link: 'light-timeline-off',
      },
      {
        link: 'light-technology-on',
      },
      {
        link: 'light-technology-off',
      },
      {
        link: 'light-stream7-on'
      },
      {
        link: 'light-stream7-off'
      },
      {
        link: 'light-human_capital-on',
      },
      {
        link: 'light-human_capital-off',
      },
      {
        link: 'light-samara-on',
      },
      {
        link: 'light-samara-off',
      },
      {
        link: 'light-samara_table',
      },
      {
        link: 'light-backlight-on',
      },
      {
        link: 'light-backlight-off',
      },
      {
        link: 'light-full-on',
      },
      {
        link: 'light-full-off',
      }
    ],
    stream7: [
      {
        link: 'light-stream7-on'
      },
      {
        link: 'colba-0',
        name: 'Покровка-Кротовка',
      },
      {
        link: 'colba-1',
        name: 'Бавлы-Куйбышев',
      },
      {
        link: 'colba-2',
        name: 'Бугуруслан-Сызрань',
      },
      {
        link: 'colba-3',
        name: 'Гурьев-Куйбышев',
      },
      {
        link: 'colba-4',
        name: 'Куйбышев-Тихорецк',
      },
      {
        link: 'colba-5',
        name: 'Куйбышев-Лисичанск',
      },
      {
        link: 'colba-6',
        name: 'НKК',
      }, {
        link: 'colba-all',
        name: 'Режим ожидания',
      },
      {
        link: 'light-stream7-off'
      },
    ],
    humanCapital: [
      {
        link: 'light-human_capital-on',
      },
      {
        link: 'light-human_capital-off',
      },
    ],
    samara: [
      {
        link: 'light-samara-on',
      },
      {
        link: 'samaraButtons-start',
        name: 'Демонстрация',
      },
      {
        link: 'samaraButtons-1',
        name: 'Резервуарный парк НП «ССН»',
      },
      {
        link: 'samaraButtons-2',
        name: 'Узел компаундирования',
      },
      {
        link: 'samaraButtons-3',
        name: 'Резервуарные парки <br>НПС «Самара-1» и НПС «Самара-2»',
        textSize: 'xs'
      },
      {
        link: 'samaraButtons-4',
        name: 'Магистральные насосные',
      },
      {
        link: 'samaraButtons-light',
        name: 'Подсветка стола',
      },
      {
        link: 'samaraButtons-idle',
        name: 'Режим ожидания',
      },
      {
        link: 'light-samara-off',
      },
    ],
    technology: [
      {
        link: 'light-technology-on',
      },
      {
        link: 'technology-past',
        name: 'Прошлое',
      },
      {
        link: 'technology-diaskan',
        name: 'Диаскан',
      },
      {
        link: 'technology-volzhanka',
        name: 'Волжанка',
      },
      {
        status: 'future',
        link: 'technology-future',
        name: 'Будущее',
      },
      {
        link: 'technology-idle',
        name: 'Режим ожидания',
      },
      {
        link: 'light-technology-off',
      },
    ],
    timeline: [
      {
        link: 'light-timeline-on',
      },
      {
        link: 'changeYear',
        name: '1936',
        index: 0,
      },
      {
        link: 'changeYear',
        name: '1953',
        index: 1,
      },
      {
        link: 'changeYear',
        name: '1961',
        index: 2,
      },
      {
        link: 'changeYear',
        name: '1970',
        index: 3,
      },
      {
        link: 'changeYear',
        name: '1974',
        index: 4,
      },
      {
        link: 'changeYear',
        name: '1979',
        index: 5,
      },
      {
        link: 'changeYear',
        name: '1980s',
        index: 6,
      },
      {
        link: 'changeYear',
        name: '1990s',
        index: 7,
      },
      {
        link: 'changeYear',
        name: '2000s',
        index: 8,
      },
      {
        link: 'changeYear',
        name: '2010s',
        index: 9,
      },
      {
        link: 'changeYear',
        name: 'VIP',
        index: -1,
      },
      {
        link: 'changeTimelineIdle',
        name: 'Режим ожидания',
      },
      {
        link: 'light-timeline-off',
      },
    ],
  },
  smallTablet: {
    main: [
      {
        model: 0,
        link: 'model_controller',
        name: 'УСТРОИЙСТВО ДЛЯ <BR> БЕЗОГНЕВОЙ РЕЗКИ ТРУБ',
        textSize: 'xs',
        size: 'lg'

      },
      {
        model: 1,
        link: 'model_controller',
        name: 'УСТАНОВКА ДЛЯ <BR> ПЛОСКОСВОРАЧИВАЕМОГО РУКАВА',
        textSize: 'xs',
        size: 'lg'
      },
      {
        model: 2,
        link: 'model_controller',
        name: 'УСТАНОВКА ЛЕДОРЕЗНАЯ',
        textSize: 'xs',
        size: 'lg'
      },
      {
        model: 3,
        link: 'model_controller',
        name: 'ГЕРМЕТИЗИРУЮЩЕЕ УСТРОЙСТВО ДЛЯ <BR> ВАНТУЗА ТРУБОПРОВОДА',
        textSize: 'xs',
        size: 'lg'
      },
    ],
  },
  humanCapital: {
    /** @type {HumanCapitalButtonExtended[]}*/
    main: [
      {
        link: 'humankind',
        name: 'Почётные <br> сотрудники',
        hidden: true,
      },
      {
        link: 'social-root',
        name: 'Социальная <br> политика',
      },
      {
        link: 'person-root',
        name: 'Кадровая <br> политика',
      },
      {
        link: 'ecology-root',
        name: 'Энергоэффективность <br> Экология <br> Охрана труда',
      },
      {
        link: 'charity-root',
        name: 'Благотворительность',
      },
      {
        link: 'certificates',
        name: 'Сертификаты <br> и свидетельства',
        hidden: true,
      },
      {
        link: 'building_quality',
        name: 'Политика в области <br> качества строительства',
      },
    ],
    humankind: [
      {
        link: 'fame_book',
        name: 'Книга почёта',
      },
      {
        link: 'veterans_book',
        name: 'Книга памяти <br> ветеранов ВОВ',
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
        name: 'Промышленная <br> и экологическая <br> безопасность',
      },
    ],
    charity: [
      {
        link: 'privolga',
        name: 'Проекты АО «Транснефть – Приволга» <br> в областях благотворительности',
        textSize: 'sm',
      },
      {
        link: 'marathone',
        name: 'Благотворительный марафон <br> "Помогаем добрым делом"',
        textSize: 'sm',
      },
    ],
    social: [
      {
        link: 'resort',
        name: 'Восстановительное <br> лечение',
      },
      {
        link: 'insurance',
        name: 'Добровольное <br> медицинское <br> страхование',
      },
      {
        link: 'mortgage',
        name: 'Жилищная ипотека',
      },
      {
        link: 'pension',
        name: 'Негосударственное <br> пенсионное обеспечение',
      },
      {
        link: 'benefits',
        name: 'Социальные льготы <br> и гарантии',
      },
      {
        link: 'young',
        name: 'Совет молодых <br> специалистов',
      },
      {
        link: 'veteran',
        name: 'Совет ветеранов',
      },
      {
        link: 'culture',
        name: 'Культурно-спортивная <br> деятельность',
      },
      {
        link: 'labor_union',
        name: 'Профсоюз',
      },
      {
        link: 'agreement',
        name: 'Коллективный договор',
      },
    ],
  },
})
