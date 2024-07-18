import { defineStore } from 'pinia'
import { userApi } from '@/services/api'
import {
  type CurrentUserResponse,
  type CurrentUserData,
  type PasswordUpdatePayload,
  type ForgotPasswordPayload,
  type UserPaginationResponse
} from '@/components/User/types'
import { AxiosError } from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as CurrentUserData | null,
    users: null as UserPaginationResponse['users'] | null,
    userMessage: '',
    isUserActive: '',
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 5,
    searchTerm: ''
  }),
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
    },
    async getUsers(page?: number, limit?: number, search?: string, filters?: any) {
      try {
        const response = await userApi.getUsers(
          page || this.currentPage,
          limit || this.itemsPerPage,
          search || this.searchTerm,
          filters || {}
        )
        const fetched = response.data as UserPaginationResponse
        this.users = fetched.users
        this.currentPage = fetched.currentPage
        this.totalPages = fetched.totalPages
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to fetch users'
        }
      }
    },
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
    async toggleUserStatus(userId: string) {
      try {
        const response = await userApi.toggleUserStatus(userId)
        const updatedUser = response.data

        if (this.users) {
          const index = this.users.findIndex((user) => user.id === userId)
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser }
          }
        }

        this.isUserActive = updatedUser.is_active
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update user status'
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
