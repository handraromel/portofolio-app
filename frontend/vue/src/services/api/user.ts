import api from '.'
import {
  type CurrentUserData,
  type PasswordUpdatePayload,
  type ForgotPasswordPayload
} from '@/types'

export const userApi = {
  currentUser: (userId: string) => api.get(`/users/${userId}`),
  updateUser: (userId: string, payload: CurrentUserData) => api.put(`/users/${userId}`, payload),
  updatePassword: (userId: string, payload: PasswordUpdatePayload) =>
    api.put(`/users/${userId}/update-password`, payload),
  forgotPassword: (payload: ForgotPasswordPayload) => api.post(`/users/forgot-password`, payload)
}
