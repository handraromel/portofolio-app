import api from '.'
import { type RegisterFormData, type SignInFormData } from '@/types'

export const authApi = {
  register: (payload: RegisterFormData) => api.post('/auth/register', payload),
  verifyEmail: (token: string) => api.post(`/auth/user-activation/${token}`),
  login: (payload: SignInFormData) => api.post('/auth/login', payload),
  verifyToken: () => api.get('/auth/verify-token'),
  logout: () => api.post('/auth/logout')
}
