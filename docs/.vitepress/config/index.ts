import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

import structure from '../../structure.json'
import constants from '../constants.json'

const customElements = ['mjx-container']

const BASE_URL = '/docs/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'AnimoXtend',
  description: 'AnimoXtend Documentation',
  head: [['link', { rel: 'icon', href: `${BASE_URL}favicon.ico` }]],
  lang: 'en-US',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/icon.png',
    nav: [
      { text: '🏠 HOME', link: '/' },
      { text: '📚 插件用户手册', link: '/cn/插件用户手册 V1.0.0/' },
      { text: '✉️ 申请试用', link: '/_register' },
    ],
    sidebar: structure[0].items,
    socialLinks: [
      { icon: 'discord', link: constants.discordServer },
      // { icon: 'github', link: constants.github },
    ],
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.frontmatter?.title) return md.render(`# ${env.frontmatter.title}`) + html
          return html
        },
      },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present AnimoXtend',
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    // 'en-US': {
    //   label: 'English',
    //   lang: 'en-US',
    //   link: 'https://carnelian-iberis-b26.notion.site/AnimoXtend-User-Manual-V1-0-0-17d18220da0f8071ac94e3c3664bc490/',
    // },
  },
  lastUpdated: true,
  base: BASE_URL,
  srcDir: '.',
  markdown: {
    math: true,
    config: (md) => {
      md.use(mathjax3)
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  cleanUrls: true,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
})
