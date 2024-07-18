export type CurrentFeedbackData = {
  id: number
  subject: string
  message: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type FeedbackFormData = {
  subject: string
  message: string
}

export type FeedbackPayload = FeedbackFormData

export interface FeedbackPaginationResponse {
  feedbacks: CurrentFeedbackData[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface FeedbacksResponse {
  msg: string
  data: FeedbackPaginationResponse
}
