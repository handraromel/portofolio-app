import { computed, type ComputedRef } from 'vue'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import type { ValidationRule } from '@vuelidate/core'
import type { CurrentUserData } from '@/types'

export function useFormValidation() {
  const withMessage = (
    validator: ValidationRule,
    message: string | ((params: any) => string)
  ): ValidationRule => helpers.withMessage(message, validator)

  const messages = {
    required: (fieldName: string) => `${fieldName} is required`,
    email: (fieldName: string) => `Please enter a valid email address for ${fieldName}`,
    minLength: (fieldName: string, min: number) =>
      `${fieldName} must be at least ${min} characters long`,
    maxLength: (fieldName: string, max: number) => `${fieldName} must not exceed ${max} characters`,
    conditionalRequired: (fieldName: string) => `${fieldName} is required when selected`,
    passwordStrength:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    passwordMatch: 'Passwords do not match',
    otherPlace: "Please specify where is this 'Outside'",
    dateRange: 'Start date must be before or equal to end date'
  }

  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  const createPasswordRules = (fieldName: string, minChars: number = 8) => ({
    required: withMessage(required, messages.required(fieldName)),
    minLength: withMessage(minLength(minChars), messages.minLength(fieldName, minChars)),
    passwordStrength: withMessage(helpers.regex(passwordStrengthRegex), messages.passwordStrength)
  })

  const signInSchema = {
    email: {
      required: withMessage(required, messages.required('Email')),
      email: withMessage(email, messages.email('Email'))
    },
    password: createPasswordRules('Password')
  }

  const registerSchema = {
    username: {
      required: withMessage(required, messages.required('Username')),
      minLength: withMessage(minLength(6), messages.minLength('Username', 6)),
      maxLength: withMessage(maxLength(30), messages.maxLength('Username', 30))
    },
    email: {
      required: withMessage(required, messages.required('Email')),
      email: withMessage(email, messages.email('Email'))
    },
    password: createPasswordRules('Password'),
    confirm_password: {
      required: withMessage(required, messages.required('Confirm Password')),
      sameAsPassword: withMessage((value, vm) => value === vm.password, messages.passwordMatch)
    }
  }

  const editProfileBaseSchema = {
    username: {
      required: withMessage(required, messages.required('Username')),
      minLength: withMessage(minLength(6), messages.minLength('Username', 6)),
      maxLength: withMessage(maxLength(30), messages.maxLength('Username', 30))
    },
    email: {
      required: withMessage(required, messages.required('Email')),
      email: withMessage(email, messages.email('Email'))
    }
  }

  const editProfileSchema = (
    formData: ComputedRef<CurrentUserData>,
    showPetName: ComputedRef<boolean>,
    showLikedMusicGenre: ComputedRef<boolean>,
    showMostLikedPlace: ComputedRef<boolean>
  ) =>
    computed(() => ({
      ...editProfileBaseSchema,
      pet_name: {
        required: withMessage(
          () => !showPetName.value || !!formData.value.pet_name,
          messages.conditionalRequired('Pet name')
        )
      },
      liked_music_genre: {
        required: withMessage(
          () => !showLikedMusicGenre.value || !!formData.value.liked_music_genre,
          messages.conditionalRequired('Music genre')
        )
      },
      most_liked_place: {
        required: withMessage(
          () => !showMostLikedPlace.value || !!formData.value.most_liked_place,
          messages.conditionalRequired('A specific place')
        )
      },
      other_place: {
        required: withMessage(
          () => formData.value.most_liked_place !== 'Outside' || !!formData.value.other_place,
          messages.otherPlace
        )
      }
    }))

  const passwordUpdateSchema = {
    old_password: createPasswordRules('Old Password'),
    new_password: createPasswordRules('New Password'),
    confirm_password: {
      required: withMessage(required, messages.required('Confirm Password')),
      sameAsPassword: withMessage((value, vm) => value === vm.new_password, messages.passwordMatch)
    }
  }

  const forgotPasswordSchema = {
    email: {
      required: withMessage(required, messages.required('Email')),
      email: withMessage(email, messages.email('Email'))
    }
  }

  const submitFeedbackSchema = {
    subject: {
      required: withMessage(required, messages.required('Subject'))
    },
    message: {
      required: withMessage(required, messages.required('Message'))
    }
  }

  return {
    signInSchema,
    registerSchema,
    editProfileSchema,
    passwordUpdateSchema,
    forgotPasswordSchema,
    submitFeedbackSchema
  }
}
