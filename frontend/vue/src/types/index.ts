export type BaseAuthType = {
  email: string
  password: string
}

// Auth Types
export type AuthUserData = {
  id: string
  email: string
  username: string
  is_admin: string
  is_active: string
}

export interface AuthUserResponse {
  msg: string
  data: AuthUserData
}

export type SignInFormData = BaseAuthType
export type SignInPayload = BaseAuthType

export type RegisterFormData = SignInFormData & {
  username: string
  confirm_password: string
}

export type RegisterPayload = Omit<RegisterFormData, 'confirm_password'>
// End Auth Types

// User Types
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
// End User Types

// Feedback Types
export type CurrentFeedbackData = {
  subject: string
  message: string
}

export type FeedbackPayload = CurrentFeedbackData

export interface FeedbackResponse {
  msg: string
  data: CurrentFeedbackData
}
// End Feedback Types

export interface AdvantageCardProps {
  iconSrc: string
  title: string
  description: string
  showButton?: boolean
  decorationFilled?: boolean
  customGap?: number
}

export type BgColorType = 'primary' | 'info' | 'secondary' | 'transparent' | 'disabled' | 'link'

export interface ButtonProps {
  buttonText: string
  bgColor?: BgColorType
  fixedWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  textSize?: 'xs' | 'sm' | 'md' | 'lg'
  loadingState?: boolean
  uppercase?: boolean
}

export interface CircledIconProps {
  iconSrc: string
  size?: 'small' | 'medium' | 'large'
  alt?: string
  isButton?: boolean
  isTransparent?: boolean
}

export interface PriceProps {
  planName: string
  price: number
  features: string[]
  isActive: boolean
}

export interface ModalProps {
  isOpen: boolean
  title?: string
  size?: string
  showCloseIcon?: boolean
  persistModal?: boolean
}

export interface SmoothScrollOptions {
  scrollTo: HTMLElement | null
  hash?: string
}

export type SmoothScrollFunction = (options: SmoothScrollOptions) => void

export interface PriceContent {
  name: string
  price: number
  features: string[]
}

export interface BlogPost {
  image: string
  topSubtitle: string
  title: string
  description: string
}
