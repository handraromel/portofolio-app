import { defineRule, configure } from 'vee-validate'
import { required, email, min, max, alpha_spaces } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { formalizeKebabCase } from './common'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha_spaces', alpha_spaces)

configure({
  generateMessage: localize('en', {
    messages: {
      required: '{field} is required',
      email: '{field} must be a valid email',
      min: '{field} must be at least 0:{min} characters',
      max: '{field} must not exceed 0:{max} characters',
      alpha_spaces: '{field} may only contain alphabetic characters and spaces'
    },
    names: {
      username: 'Username',
      email: 'Email',
      password: 'Password',
      first_name: formalizeKebabCase('first_name'),
      last_name: formalizeKebabCase('last_name')
    }
  })
})

defineRule('password_strength', (value: string) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  }
  return true
})

export const signInSchema = {
  email: 'required|email',
  password: 'required|min:8'
}

export const registerSchema = {
  username: 'required|min:6|max:30',
  email: 'required|email',
  password: 'required|min:8|password_strength'
}
