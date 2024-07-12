import axios from 'axios'
import { authApi } from './auth'
import { userApi } from './user'
import { feedbackApi } from './feedback'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

export { authApi, userApi, feedbackApi }
export default api
