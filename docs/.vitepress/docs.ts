import constants from './constants'

const base_url = constants.base_url

export const docsConfig = {
  title: 'AnimoXtend',
  description: 'AnimoXtend Documentation',
  lang: 'zh',
  lastUpdated: true, // Enable last updated display
  base: base_url,
  srcDir: '.',
  /* Router Config */
  cleanUrls: true,
  rewrites: {},
}
