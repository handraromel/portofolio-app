import api from '.'
import { type SignInPayload, type RegisterPayload } from '@/types'

export const authApi = {
  register: (payload: RegisterPayload) => api.post('/auth/register', payload),
  verifyEmail: (token: string) => api.post(`/auth/user-activation/${token}`),
  login: (payload: SignInPayload) => api.post('/auth/login', payload),
  verifyToken: () => api.get('/auth/verify-token'),
  logout: () => api.post('/auth/logout')
}
