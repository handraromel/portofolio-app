import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/HomeView.vue'
import { IndexView } from '@/views/sections'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vue-express-portofolio/',
      name: 'portofolio',
      component: IndexView
    },
    {
      path: '/user-activation/:token',
      name: 'verifyEmail',
      component: IndexView
    }
  ]
})

export default router
