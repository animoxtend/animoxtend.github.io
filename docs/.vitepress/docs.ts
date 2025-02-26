import constants from './constants'

export const docsConfig = {
  title: constants.title,
  description: 'AnimoXtend Documentation',
  lang: 'zh',
  lastUpdated: true, // Enable last updated display
  base: constants.base_url,
  srcDir: '.',
  /* Router Config */
  cleanUrls: true,
  rewrites: {},
}
