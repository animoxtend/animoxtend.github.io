import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

import { themeConfig } from './theme/themeConfig'
import { docsConfig } from './docs'
import { head } from './head'
import { enConfig, zhConfig } from './configs'

import unocss from 'unocss/vite'

// Element Plus components on demand import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
    plugins: [
      unocss(),
      // unplugin-auto-import
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // unplugin-vue-components
      Components({
        dts: 'components.d.ts',
        resolvers: [ElementPlusResolver(), NaiveUiResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})
