import { defineStore } from 'pinia'
import { feedbackApi } from '@/services/api'
import { type FeedbackPayload, type CurrentFeedbackData, type FeedbackResponse } from '@/types'
import { AxiosError } from 'axios'

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedback: null as CurrentFeedbackData | null,
    userMessage: ''
  }),
  actions: {
    async submitFeedback(userId: string, payload: FeedbackPayload) {
      try {
        const response = await feedbackApi.submitFeedback(userId, payload)
        const fetched = response.data as FeedbackResponse
        this.feedback = fetched.data
        this.userMessage = fetched.msg
        return true
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 401) {
            this.feedback = null
            this.userMessage = error.response.data.msg
          }
        }
        return false
      }
    },
    async getFeedbacks(userId: string) {
      try {
        const response = await feedbackApi.getFeedbacks(userId)
        const fetched = response.data as FeedbackResponse
        this.feedback = fetched.data
        this.userMessage = fetched.msg
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update profile'
        }
      }
    },
    async getFeedbacksById(userId: string, feedbackId: string) {
      try {
        const response = await feedbackApi.getFeedbackById(userId, feedbackId)
        const fetched = response.data as FeedbackResponse
        this.feedback = fetched.data
        this.userMessage = fetched.msg
      } catch (error) {
        if (error instanceof AxiosError) {
          this.userMessage = error.response?.data?.msg || 'Failed to update your password'
        }
      }
    }
  }
})
