import type { DefaultTheme as DefaultThemeType } from 'vitepress'

import constants from '../constants'
import { getNav } from '../nav/en'

// https://vitepress.dev/reference/default-theme-config
export const themeConfig: DefaultThemeType.Config = {
  logo: `${constants.base_url}/icon.png`,
  siteTitle: constants.title,
  socialLinks: [{ icon: 'discord', link: constants.socialLinks.discordServer }],
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2019-present AnimoXtend',
  },
  nav: getNav(),
  i18nRouting: false,
  /*
  // Search Config
  search: {
    provider: 'local',
    // Search Config for locales
    options: {
      locales: {
        // Default Language
        zh: {
          translations: {
            button: {
              buttonText: '搜索',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询结果',
              footer: {
                selectText: '选择',
                navigateText: '切换',
              },
            },
          },
        },
        en: {
          translations: {
            button: {
              buttonText: 'Search',
              buttonAriaLabel: 'Search for Documents',
            },
            modal: {
              noResultsText: 'Unable to find relevant results',
              resetButtonTitle: 'Clear Query Results',
              footer: {
                selectText: 'select',
                navigateText: 'switch',
              },
            },
          },
        },
      },
    },
  },
  */
}
