import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Navigation guard for protected routes
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/DashboardView.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: () => import('../views/dashboard/DashboardHome.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/dashboard/ProfileView.vue')
      },
      {
        path: 'messages',
        name: 'messages',
        component: () => import('../views/dashboard/MessagesView.vue')
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('../views/dashboard/TransactionsView.vue')
      }
    ]
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