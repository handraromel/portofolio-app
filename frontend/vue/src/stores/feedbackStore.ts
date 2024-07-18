import { defineStore } from 'pinia'
import { feedbackApi } from '@/services/api'
import {
  type FeedbackPayload,
  type FeedbackPaginationResponse,
  type FeedbacksResponse
} from '@/components/Feedback/types'
import { AxiosError } from 'axios'

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: null as FeedbackPaginationResponse['feedbacks'] | null,
    userMessage: '',
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 5,
    searchTerm: '',
    isLoading: false
  }),
  actions: {
    async submitFeedback(userId: string, payload: FeedbackPayload) {
      try {
        const response = await feedbackApi.submitFeedback(userId, payload)
        const fetched = response.data as FeedbacksResponse
        this.userMessage = fetched.msg
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            this.userMessage = error.response.data.msg
          }
        }
        return false
      }
    },
    setSearchTerm(term: string) {
      this.searchTerm = term
    },
    async getFeedbacks(
      userId: string,
      page?: number,
      limit?: number,
      search?: string,
      filters?: any
    ) {
      if (this.isLoading) return

      this.isLoading = true
      try {
        const response = await feedbackApi.getFeedbacks(
          userId,
          page || this.currentPage,
          limit || this.itemsPerPage,
          search !== undefined ? search : this.searchTerm,
          filters || {}
        )
        const fetched = response.data as FeedbackPaginationResponse
        this.feedbacks = fetched.feedbacks
        this.currentPage = fetched.currentPage
        this.totalPages = fetched.totalPages
        if (search !== undefined) this.searchTerm = search
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to fetch feedbacks'
        }
      } finally {
        this.isLoading = false
      }
    }
  }
})
