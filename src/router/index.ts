import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ArticlesPage from '../views/ArticlesPage.vue'
import ArticleDetailPage from '../views/ArticleDetailPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/whitepaper', name: 'whitepaper', component: HomePage },
    {
      path: '/articles/:category',
      name: 'articles',
      component: ArticlesPage,
      props: true
    },
    {
      path: '/article/:slug',
      name: 'article-detail',
      component: ArticleDetailPage,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
