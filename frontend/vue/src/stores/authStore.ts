import { defineStore } from 'pinia'
import { authApi } from '@/services/api'
import { type UserDataResponse, type AuthUserData } from '@/types'
import { AxiosError } from 'axios'
import { type RegisterFormData, type SignInFormData } from '@/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUserData | null,
    isAuthenticated: false,
    authMessage: ''
  }),
  actions: {
    async register(payload: RegisterFormData) {
      try {
        const response = await authApi.register(payload)
        this.authMessage = response.data.msg
        return true
      } catch (error: any) {
        this.authMessage =
          error.response?.data?.msg || 'Registration failed, please contact your administrator'
        return false
      }
    },
    async verifyEmail(token: string) {
      const response = await authApi.verifyEmail(token)
      return response.data
    },
    async login(payload: SignInFormData) {
      try {
        const response = await authApi.login(payload)
        const loginResponse = response.data as UserDataResponse
        this.user = loginResponse.data
        this.isAuthenticated = true
        this.authMessage = loginResponse.msg
        return true
      } catch (error) {
        console.error('Login failed:', error)
        this.authMessage = 'Login failed'
        return false
      }
    },
    async logout() {
      try {
        await authApi.logout()
        this.user = null
        this.isAuthenticated = false
        this.authMessage = 'Logged out successfully'
      } catch (error) {
        console.error('Logout failed:', error)
        this.authMessage = 'Logout failed'
      }
    },
    async verifyToken() {
      try {
        const response = await authApi.verifyToken()
        const verifyTokenResponse = response.data as UserDataResponse
        this.user = verifyTokenResponse.data
        this.isAuthenticated = true
        this.authMessage = verifyTokenResponse.msg
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
