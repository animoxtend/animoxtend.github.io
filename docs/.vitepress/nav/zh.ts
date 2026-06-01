import type { DefaultTheme } from 'vitepress'

import CONSTANTS from '../constants'

const folder = CONSTANTS.localesSettings.zh.folder

export function getNav() {
  return [
    { text: '🏠 主页', link: '/' },
    { text: '📚 插件用户手册', link: `/${folder}/插件用户手册 V1.0.0/` },
    { text: '✉️ 申请试用', link: `/${folder}/_register` },
  ] satisfies DefaultTheme.Config['nav']
}
