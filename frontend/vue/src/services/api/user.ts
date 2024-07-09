import api from '.'
import { type CurrentUserData } from '@/types'

export const userApi = {
  currentUser: (userId: string) => api.get(`/users/${userId}`),
  updateUser: (userId: string, payload: CurrentUserData) => api.put(`/users/${userId}`, payload)
}
