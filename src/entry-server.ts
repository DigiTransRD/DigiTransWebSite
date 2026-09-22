import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createSiteRouter } from './router'
import { i18n } from './plugins/i18n'
import App from './App.vue'
export { staticPaths, getPageMetadata, site } from './content/siteMetadata'
export { detailPages } from './content/detailContent'
export { productIdentity } from './content/homeContent'

export async function render(path: string) {
  const router = createSiteRouter(true)
  const app = createSSRApp(App)
  app.use(router)
  app.use(i18n)
  await router.push(path)
  await router.isReady()
  return renderToString(app)
}
