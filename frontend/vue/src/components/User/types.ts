import { type BaseAuthType } from '../Auth/types'

export type CurrentUserData = {
  username: string
  email: string
  first_name?: string | null
  last_name?: string | null
  pet_name?: string | null
  liked_music_genre?: string | null
  most_liked_place?: string | null
  other_place?: string | null
  feel_score: number
}

export type PasswordUpdateFormData = {
  old_password: string
  new_password: string
  confirm_password: string
}

export type ForgotPasswordFormData = Omit<BaseAuthType, 'password'>

export type PasswordUpdatePayload = Omit<PasswordUpdateFormData, 'confirm_password'>
export type ForgotPasswordPayload = ForgotPasswordFormData

export interface CurrentUserResponse {
  msg: string
  data: CurrentUserData
}

export type UsersData = {
  id: string
  email: string
  username: string
  is_admin: boolean
  is_active: boolean
  createdAt: string
}

export interface UserPaginationResponse {
  users: UsersData[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface UsersResponse {
  msg: string
  data: UserPaginationResponse
}

//For Dropdown
export interface Filters {
  dateRange?: string
  isActive?: boolean
  isAdmin?: boolean
}
