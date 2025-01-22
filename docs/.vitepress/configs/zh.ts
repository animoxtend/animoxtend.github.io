import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

import { getNav as getNav } from '../nav/zh'
import { getSidebar } from '../sidebar/zh'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  themeConfig: {
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',
    // 文档页脚文本配置
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: getNav(),
    sidebar: getSidebar(),
    outline: {
      level: 'deep', // 右侧大纲标题层级
      label: '目录', // 右侧大纲标题文本配置
    },
  },
}
