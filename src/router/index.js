import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Navigation guard for protected routes
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (token) {
    // If we have a token, we're authenticated
    // The profile will be loaded in the component's mounted hook
    next()
  } else {
    next('/auth/login')
  }
}

// Global navigation guard to handle auth state changes
const handleAuthStateChange = () => {
  // Trigger auth change event on navigation
  window.dispatchEvent(new Event('user-auth-change'))
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/auth/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/auth/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/auth/RegisterView.vue')
      },
      {
        path: 'callback',
        name: 'auth-callback',
        component: () => import('../views/auth/AuthCallback.vue')
      }
    ]
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
        path: 'my-items',
        name: 'my-items',
        component: () => import('../views/dashboard/MyItemsView.vue')
      },
      {
        path: 'add-item',
        name: 'add-item',
        component: () => import('../views/dashboard/AddItemView.vue')
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
    component: () => import('../views/WishView.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/swap',
    name: 'swap',
    component: () => import('../views/SwapView.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('../views/MembersView.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
    beforeEnter: requireAuth
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
  },
  {
    path: '/item/:id',
    name: 'item-detail',
    component: () => import('../views/ItemDetailView.vue')
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

// Add global after navigation hook
router.afterEach(handleAuthStateChange)

export default router