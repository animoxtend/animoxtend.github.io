import type { HeadConfig } from 'vitepress'
import constants from './constants'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: `${constants.base_url}favicon.ico` }],
  [
    'script',
    {},
    `
    window._hmt = window._hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?6f6f0183036ffe0609365a3c905df6c1";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    `,
  ],
]
