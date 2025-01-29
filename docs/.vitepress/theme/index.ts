// https://vitepress.dev/guide/custom-theme
import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import type { Theme } from 'vitepress'
import { useRoute, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, inject, onMounted, watch, nextTick } from 'vue'
import './style.css'
import './styles/custom.scss'
// plugins
import busuanzi from 'busuanzi.pure.js' // 不蒜子
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import mediumZoom from 'medium-zoom'

const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      // @ts-ignore: ts(18046)
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
          h(Layout, null, {
            default: this.$slots.default?.(),
          }),
          // @ts-ignore: ts(2239)
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
  setup() {
    const route = useRoute()
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  },
  enhanceApp({ app, router, siteData }) {
    // @ts-ignore: ts(2239)
    if (import.meta?.env?.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
    // 动态导入并注册全局组件
    import('./components/RegisterForm.vue').then((module) => {
      app.component('RegisterForm', module.default)
    })
    import('./components/bsz.vue').then((module) => {
      app.component('bsz', module.default)
    })
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch() // 不蒜子
        NProgress.done() // 停止进度条
      }
    }
  },
} satisfies Theme
