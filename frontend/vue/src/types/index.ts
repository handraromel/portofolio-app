export type ModalName =
  | 'signIn'
  | 'register'
  | 'info'
  | 'displayData'
  | 'editProfile'
  | 'updatePassword'
  | 'forgotPassword'
  | 'manageUsers'

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
  buttonText?: string
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

//Inputs types
export interface DropdownOption {
  value: string
  label: string
}
export interface DropdownProps {
  id: string
  label?: string
  modelValue: string | null
  options: DropdownOption[]
  placeholder?: string
  error?: string
}

export type FieldInputType = 'text' | 'email' | 'password' | 'textarea' | 'datepicker'
export interface FieldInputProps {
  id?: string
  label?: string
  name?: string
  type: FieldInputType
  modelValue: string | Date
  placeholder?: string
  error?: string
  isTextarea?: boolean
  rows?: number
}

export interface SliderInputProps {
  id?: string
  label?: string
  modelValue: number
  min?: number
  max?: number
  step?: number
  colorizeBg?: boolean
  displayValue?: boolean
  error?: string
}

export interface SwitchInputProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
}
