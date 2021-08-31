import { createWebHistory, createRouter } from 'vue-router'
// components
import Home from '@/views/Home'
import About from '@/views/About'
import Error from '@/views/Error'

const history = createWebHistory()

export default createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/:catchAll(.*)',
      name: 'Error',
      component: Error
    }
  ]
})
