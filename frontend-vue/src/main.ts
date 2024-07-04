import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3SmoothScroll from 'vue3-smooth-scroll'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3SmoothScroll, {
  offset: -170,
  updateHistory: false,
  duration: 500
})

app.mount('#app')
