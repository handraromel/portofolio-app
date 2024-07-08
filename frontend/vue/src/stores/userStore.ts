import { defineStore } from 'pinia'
import { userApi } from '@/services/api'
import { type CurrentUserResponse, type CurrentUserData } from '@/types'
import { AxiosError } from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as CurrentUserData | null,
    userMessage: ''
  }),
  actions: {
    async currentUser(userId: string) {
      try {
        const response = await userApi.currentUser(userId)
        const currentUser = response.data as CurrentUserResponse
        this.user = currentUser.data
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            this.user = null
            this.userMessage = error.message
          }
        }
      }
    },
    async updateUser(userId: string, payload: CurrentUserData) {
      try {
        const response = await userApi.updateUser(userId, payload)
        const updatedUser = response.data as CurrentUserResponse
        this.user = updatedUser.data
        this.userMessage = 'Profile updated successfully'
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update profile'
        }
        return false
      }
    }
  }
})
