import { createApp } from 'vue'
// router
import router from '@/router'
// components
import App from './App.vue'
// styles
import '@/assets/css/tailwind.css'

createApp(App).use(router).mount('#app')
