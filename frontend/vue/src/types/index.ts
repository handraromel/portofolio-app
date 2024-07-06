// Auth Interfaces
interface AuthUserData {
  id: string
  email: string
  username: string
  is_admin: string
  is_active: string
}

interface UserDataResponse {
  msg: string
  data: AuthUserData
}
// End Auth Interfaces

interface AdvantageCardProps {
  iconSrc: string
  title: string
  description: string
  showButton?: boolean
  decorationFilled?: boolean
  customGap?: number
}

type BgColorType = 'primary' | 'secondary' | 'transparent' | 'disabled'

interface ButtonProps {
  buttonText: string
  bgColor?: BgColorType
  fixedWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

interface CircledIconProps {
  iconSrc: string
  size?: 'small' | 'medium' | 'large'
  alt?: string
  isButton?: boolean
  isTransparent?: boolean
}

interface PriceProps {
  planName: string
  price: number
  features: string[]
  isActive: boolean
}

interface ModalProps {
  isOpen: boolean
  title?: string
  size?: 'md' | 'lg' | 'xl'
  showCloseIcon?: boolean
  persistModal?: boolean
}

interface SmoothScrollOptions {
  scrollTo: HTMLElement | null
  hash?: string
}

type SmoothScrollFunction = (options: SmoothScrollOptions) => void

interface PriceContent {
  name: string
  price: number
  features: string[]
}

interface BlogPost {
  image: string
  topSubtitle: string
  title: string
  description: string
}

type SignInFormData = {
  email: string
  password: string
}

type RegisterFormData = {
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
}

export type {
  AuthUserData,
  UserDataResponse,
  AdvantageCardProps,
  ButtonProps,
  CircledIconProps,
  PriceProps,
  ModalProps,
  SmoothScrollFunction,
  PriceContent,
  BlogPost,
  SignInFormData,
  RegisterFormData
}
