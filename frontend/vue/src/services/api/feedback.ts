import api from '.'
import { type FeedbackPayload } from '@/components/Feedback/types'

export const feedbackApi = {
  submitFeedback: (userId: string, payload: FeedbackPayload) =>
    api.post(`/feedback/${userId}/submit`, payload),
  getFeedbacks: (
    userId: string,
    page: number,
    limit: number,
    search: string = '',
    filters: any = {}
  ) =>
    api.get(`/feedback/${userId}`, {
      params: {
        page,
        limit,
        search,
        dateRange: filters.dateRange
      }
    })
}
