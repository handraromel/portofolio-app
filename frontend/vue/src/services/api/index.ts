import axios from 'axios'
import { authApi } from './auth'
import { userApi } from './user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

export { authApi, userApi }
export default api
