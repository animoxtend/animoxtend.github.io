import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

import { getNav as getNav } from '../nav/en'
import { getSidebar } from '../sidebar/en'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    nav: getNav(),
    sidebar: getSidebar(),
    outline: {
      level: 'deep',
      label: 'Contents',
    },
  },
}
