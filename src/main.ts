import { createApp } from 'vue'
import { createSiteRouter } from './router'
import { i18n } from './plugins/i18n'
import { updatePageMetadata } from './content/siteMetadata'
import App from './App.vue'
import './style.css'

if (window.location.hash.startsWith('#/')) {
  const legacyTarget = window.location.hash.slice(1)
  if (legacyTarget.startsWith('/') && !legacyTarget.startsWith('//')) window.history.replaceState(null, '', legacyTarget)
}
const router = createSiteRouter()
router.afterEach(to => updatePageMetadata(to.path))
const app = createApp(App)
app.use(router)
app.use(i18n)
router.isReady().then(() => app.mount('#app'))
