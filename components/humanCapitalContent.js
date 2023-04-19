/**
 * @typedef {Object} HumanCapitalContent
 * @property {string} code
 * @property {string} subtitle
 * @property {HumanCapitalImage[]} [images]
 * @property {string} [video]
 * @property {HumanCapitalButton[]} [buttons]
 */

/**
 * @typedef {Object} HumanCapitalButton
 * @property {string} title
 * @property {() => void} action
 */

/**
 * @typedef {Object} HumanCapitalImage
 * @property {string} src
 * @property {string} [title]
 */

/**
 *
 * @param pageName
 * @return {HumanCapitalContent}
 */

export const getHumanCapitalContent = (pageName) => {
  console.log('getHumanCapitalContent', pageName)
  /** @type {HumanCapitalContent} */
  let content = {};
  content.code = pageName
  switch (pageName) {
    case 'resort':
      content.subtitle = 'Санаторно-курортное и реабилитационное-восстановительное лечение'

      break
    case 'insurance':
      content.subtitle = 'Страхование'
      content.images = [
        {src:'/images/debug/images.jpg'},
        {src:'/images/debug/img2.png'}
      ]
      break
    case 'mortgage':
      content.subtitle = 'Ипотека'
      content.images = [
        {src:'/images/debug/img2.png', title: 'Подпись к картинке'},
      ]
      break
    default:
      content.subtitle = `Страница ${pageName} не найдена`
      break

  }
  return content

}
