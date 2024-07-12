import { defineStore } from 'pinia'
import { authApi } from '@/services/api'
import {
  type AuthUserResponse,
  type AuthUserData,
  type SignInPayload,
  type RegisterPayload
} from '@/types'
import { AxiosError } from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUserData | null,
    isAuthenticated: false,
    userMessage: ''
  }),
  actions: {
    async register(payload: RegisterPayload) {
      try {
        const response = await authApi.register(payload)
        this.userMessage = response.data.msg
        return true
      } catch (error: any) {
        this.userMessage =
          error.response?.data?.msg || 'Registration failed, please contact your administrator'
        return false
      }
    },
    async verifyEmail(token: string) {
      const response = await authApi.verifyEmail(token)
      return response.data
    },
    async login(payload: SignInPayload) {
      try {
        const response = await authApi.login(payload)
        const loginResponse = response.data as AuthUserResponse
        this.user = loginResponse.data
        this.isAuthenticated = true
        this.userMessage = loginResponse.msg
        return true
      } catch (error) {
        console.error('Login failed')
        this.userMessage = 'Login failed'
        return false
      }
    },
    async logout() {
      try {
        await authApi.logout()
        this.user = null
        this.isAuthenticated = false
        this.userMessage = "You're now logged out"
      } catch (error) {
        console.error('Logout failed')
        this.userMessage = 'Logout failed'
      }
    },
    async verifyToken() {
      try {
        const response = await authApi.verifyToken()
        const verifyTokenResponse = response.data as AuthUserResponse
        this.user = verifyTokenResponse.data
        this.isAuthenticated = true
        this.userMessage = verifyTokenResponse.msg
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            this.user = null
            this.isAuthenticated = false
            console.warn('Token not exist')
          }
        }
      }
    }
  },
  getters: {
    getUserId: (state) => state.user?.id ?? '',
    getUsername: (state) => state.user?.username ?? '',
    getEmail: (state) => state.user?.email ?? '',
    getUserStatus: (state) => state.user?.is_active ?? '',
    getAdminCheck: (state) => state.user?.is_admin
  }
})
