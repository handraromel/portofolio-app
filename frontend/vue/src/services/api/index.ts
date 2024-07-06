import axios from 'axios'
import { authApi } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

export { authApi }
export default api
