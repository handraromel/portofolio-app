import { computed } from 'vue'
import { defineRule, configure } from 'vee-validate'
import { required, email, min, max, alpha_spaces, min_value, max_value } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha_spaces', alpha_spaces)
defineRule('min_value', min_value)
defineRule('max_value', max_value)

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
      first_name: 'First Name',
      last_name: 'Last Name'
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

export const editProfileSchema = {
  username: 'required|min:6|max:30',
  email: 'required|email'
}
