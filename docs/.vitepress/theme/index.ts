// https://vitepress.dev/guide/custom-theme
import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, inject } from 'vue'
import './style.css'
import './styles/custom.scss'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect(),
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style,
    })
  },
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  },
})

const NaiveUiProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta?.env?.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      },
    )
  },
})

export default {
  extends: DefaultTheme,
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  Layout: NaiveUiProvider,
  enhanceApp({ app, router, siteData }) {
    if (import.meta?.env?.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
    // 动态导入并注册全局组件
    import('./components/RegisterForm.vue').then((module) => {
      app.component('RegisterForm', module.default)
    })
    // ...
  },
} satisfies Theme
