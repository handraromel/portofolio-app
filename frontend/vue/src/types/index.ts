export type BaseAuthType = {
  email: string
  password: string
}

// Auth Types
export interface AuthUserData extends BaseAuthType {
  id: string
  username: string
  is_admin: string
  is_active: string
}

export interface AuthUserResponse {
  msg: string
  data: AuthUserData
}

export type SignInFormData = BaseAuthType

export type RegisterFormData = SignInFormData & {
  username: string
}
// End Auth Types

// User Types
export interface CurrentUserData {
  username: string
  email: string
  first_name: string | null
  last_name: string | null
  has_pet: boolean
  pet_name?: string | null
  has_liked_music_genre: boolean
  liked_music_genre?: string | null
  has_most_liked_place: boolean
  most_liked_place?: string | null
  other_place?: string
  feel_score: number
}

export interface CurrentUserResponse {
  msg: string
  data: CurrentUserData
}
// End User Types

export interface AdvantageCardProps {
  iconSrc: string
  title: string
  description: string
  showButton?: boolean
  decorationFilled?: boolean
  customGap?: number
}

export type BgColorType = 'primary' | 'info' | 'secondary' | 'transparent' | 'disabled'

export interface ButtonProps {
  buttonText: string
  bgColor?: BgColorType
  fixedWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  textSize?: 'xs' | 'sm' | 'md' | 'lg'
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
