import type { HeadConfig } from 'vitepress'
import constants from './constants'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: `${constants.base_url}favicon.ico` }],
]
