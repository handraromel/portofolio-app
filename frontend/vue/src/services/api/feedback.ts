import api from '.'
import { type FeedbackPayload } from '@/types'

export const feedbackApi = {
  submitFeedback: (userId: string, payload: FeedbackPayload) =>
    api.post(`/feedback/${userId}/submit`, payload),
  getFeedbacks: (userId: string) => api.get(`/feedbacks/${userId}`),
  getFeedbackById: (userId: string, feedbackId: string) =>
    api.get(`/feedbacks/${userId}/${feedbackId}`)
}
