import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wish',
    name: 'wish',
    component: () => import('../views/WishView.vue')
  },
  {
    path: '/swap',
    name: 'swap',
    component: () => import('../views/SwapView.vue')
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('../views/MembersView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue')
  },
  // Footer routes
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/PrivacyView.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/TermsView.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FaqView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/HelpView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router