import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { initFavicon, setFavicon } from './utils/faviconManager'
import { initializeTestUsers } from './services/testUsers'
import ImageUtils from './utils/imageUtils'

const app = createApp(App)

// Make store available globally
app.config.globalProperties.$store = store

// Initialize favicon based on current auth state
initFavicon()

// Initialize test users for the application
initializeTestUsers()

// Listen for auth state changes
window.addEventListener('user-auth-change', () => {
  const isAuthenticated = !!localStorage.getItem('token')
  setFavicon(isAuthenticated)
})

app.use(router)
app.use(ImageUtils)
app.mount('#app')
