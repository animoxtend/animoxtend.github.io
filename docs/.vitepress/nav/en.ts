import type { DefaultTheme } from 'vitepress'

import CONSTANTS from '../constants'

const folder = CONSTANTS.localesSettings.en.folder

export function getNav() {
  return [
    { text: '🏠 Home', link: '/' },
    {
      text: '📚 Guide',
      link: 'https://carnelian-iberis-b26.notion.site/AnimoXtend-User-Manual-V1-0-0-17d18220da0f8071ac94e3c3664bc490/',
    },
    { text: '✉️ Apply for a Trial', link: `/${folder}/_register` },
  ] satisfies DefaultTheme.Config['nav']
}
