import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ArticlesPage from '../views/ArticlesPage.vue'
import ArticleDetailPage from '../views/ArticleDetailPage.vue'
import DetailPage from '../views/DetailPage.vue'
import ContactPage from '../views/ContactPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import { detailPages } from '../content/detailContent'

export function createSiteRouter(server = false) {
  const router = createRouter({
    history: server ? createMemoryHistory('/') : createWebHistory('/'),
    routes: [
      { path: '/', name: 'home', component: HomePage },
      { path: '/whitepaper', redirect: '/architecture/' },
      ...detailPages.map(page => ({ path: page.path, component: DetailPage })),
      { path: '/contact/', component: ContactPage },
      { path: '/articles/:category', name: 'articles', component: ArticlesPage, props: true },
      { path: '/article/:slug', name: 'article-detail', component: ArticleDetailPage, props: true },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
    ],
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) {
        const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))
        return { el: to.hash, top: headerHeight + 24, behavior: 'instant' }
      }
      return { top: 0 }
    },
  })
  router.beforeEach(to => {
    if (to.hash.startsWith('#/')) {
      const legacyPath = to.hash.slice(1)
      if (!legacyPath.startsWith('//')) return legacyPath
    }
    if (detailPages.some(page => page.path === to.path + '/') || to.path === '/contact') {
      return { path: to.path + '/', query: to.query, hash: to.hash, replace: true }
    }
    if ((to.path.startsWith('/article/') || to.path.startsWith('/articles/')) && !to.path.endsWith('/')) {
      return { path: to.path + '/', query: to.query, hash: to.hash, replace: true }
    }
  })
  return router
}
