import api from '.'
import {
  type CurrentUserData,
  type PasswordUpdatePayload,
  type ForgotPasswordPayload
} from '@/components/User/types'

export const userApi = {
  getUsers: (page: number, limit: number, search: string = '', filters: any = {}) =>
    api.get(`/users`, {
      params: {
        page,
        limit,
        search,
        isActive: filters.isActive,
        isAdmin: filters.isAdmin,
        dateRange: filters.dateRange
      }
    }),
  currentUser: (userId: string) => api.get(`/users/${userId}`),
  updateUser: (userId: string, payload: CurrentUserData) => api.put(`/users/${userId}`, payload),
  updatePassword: (userId: string, payload: PasswordUpdatePayload) =>
    api.put(`/users/${userId}/update-password`, payload),
  forgotPassword: (payload: ForgotPasswordPayload) => api.post(`/users/forgot-password`, payload),
  toggleUserStatus: (userId: string) => api.put(`/users/${userId}/change-status`)
}
