export type BaseAuthType = {
  email: string
  password: string
}

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
