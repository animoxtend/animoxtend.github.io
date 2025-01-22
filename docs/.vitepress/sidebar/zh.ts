import type { DefaultTheme } from 'vitepress'

import structure from '../structure.json'
import constants from '../constants'

const folder = constants.localesSettings.zh.folder

export const getSidebar = () => {
  const sidebarConfig: DefaultTheme.Config['sidebar'] = structure.filter(
    (item) => item.text === folder,
  )[0]?.items
  return sidebarConfig ?? []
}
