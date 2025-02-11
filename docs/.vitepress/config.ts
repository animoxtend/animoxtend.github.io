import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

import { themeConfig } from './theme/themeConfig'
import { docsConfig } from './docs'
import { head } from './head'
import { enConfig, zhConfig } from './configs'

const fileAndStyles: Record<string, string> = {}
const customElements: string[] = []

// https://vitepress.dev/reference/site-config
export default defineConfig({
  /* Docs Config */
  ...docsConfig,
  /* Head Config */
  head,
  /* Theme Config */
  themeConfig,
  /* Locales Config */
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      ...zhConfig,
    },
    en: {
      label: 'English',
      lang: 'en',
      ...enConfig,
    },
  },
  markdown: {
    math: true,
    config: (md) => {
      md.use(mathjax3)
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc'],
    },
    postRender(context) {
      const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
      const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
      const style = styleRegex.exec(context.content)?.[1]
      const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
      if (vitepressPath && style) {
        fileAndStyles[vitepressPath] = style
      }
      context.content = context.content.replace(styleRegex, '')
      context.content = context.content.replace(vitepressPathRegex, '')
    },
    transformHtml(code, id) {
      const html = id.split('/').pop()
      if (!html) return
      const style = fileAndStyles[`/${html}`]
      if (style) {
        return code.replace(/<\/head>/, `${style}</head>`)
      }
    },
  },
})
