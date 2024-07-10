import { defineStore } from 'pinia'
import { userApi } from '@/services/api'
import {
  type CurrentUserResponse,
  type CurrentUserData,
  type PasswordUpdatePayload,
  type ForgotPasswordPayload
} from '@/types'
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
        const fetched = response.data as CurrentUserResponse
        this.user = fetched.data
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
        const fetched = response.data as CurrentUserResponse
        this.user = fetched.data
        this.userMessage = 'Profile updated successfully'
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update profile'
        }
        return false
      }
    },
    async updatePassword(userId: string, payload: PasswordUpdatePayload) {
      try {
        const response = await userApi.updatePassword(userId, payload)
        const fetched = response.data as CurrentUserResponse
        this.user = fetched.data
        this.userMessage = 'Password updated successfully'
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update your password'
        }
        return false
      }
    },
    async forgotPassword(payload: ForgotPasswordPayload) {
      try {
        const response = await userApi.forgotPassword(payload)
        const fetched = response.data as CurrentUserResponse
        this.userMessage = fetched.msg
        return true
      } catch (error) {
        console.log('error here', error)
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to send your new password'
        }
        return false
      }
    }
  }
})
