import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

// Make store available globally
app.config.globalProperties.$store = store

app.use(router)
app.mount('#app')
