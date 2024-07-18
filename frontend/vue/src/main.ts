import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores'
import Vue3SmoothScroll from 'vue3-smooth-scroll'
import Toast from 'vue-toastification'
import vScrollAnimation from './directives/scrollAnimation'
import { toastrOptions } from '@/utils/toastInit'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.directive('scroll-animation', vScrollAnimation)

app.use(createPinia())
app.use(router)
app.use(Vue3SmoothScroll, {
  offset: -170,
  updateHistory: false,
  duration: 500
})
app.use(Toast, toastrOptions)

const authStore = useAuthStore()
authStore.verifyToken()

app.mount('#app')
