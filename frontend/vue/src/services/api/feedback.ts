import api from '.'
import { type FeedbackPayload } from '@/types'

export const feedbackApi = {
  submitFeedback: (userId: string, payload: FeedbackPayload) =>
    api.post(`/feedback/${userId}/submit`, payload),
  getFeedbacks: (userId: string, page: number, limit: number) =>
    api.get(`/feedback/${userId}`, { params: { page, limit } })
}
