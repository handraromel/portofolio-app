import { computed, type ComputedRef } from 'vue'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import type { ValidationRule, ValidationRuleWithoutParams } from '@vuelidate/core'
import type { CurrentUserData } from '@/types'

type VuelidateMessageGenerator = (params: { $params: Record<string, any> }) => string

const withMessage = (
  validator: ValidationRule | ValidationRuleWithoutParams,
  message: string | VuelidateMessageGenerator
): ValidationRule => helpers.withMessage(message, validator)

export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: ({ $params }: { $params: Record<string, any> }) =>
    `This field must be at least ${$params.min} characters long`,
  maxLength: ({ $params }: { $params: Record<string, any> }) =>
    `This field must not exceed ${$params.max} characters`,
  passwordStrength:
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
}

export const signInSchema = {
  email: {
    required: withMessage(required, validationMessages.required),
    email: withMessage(email, validationMessages.email)
  },
  password: {
    required: withMessage(required, validationMessages.required),
    minLength: withMessage(minLength(8), validationMessages.minLength)
  }
}

export const registerSchema = {
  username: {
    required: withMessage(required, validationMessages.required),
    minLength: withMessage(minLength(6), validationMessages.minLength),
    maxLength: withMessage(maxLength(30), validationMessages.maxLength)
  },
  email: {
    required: withMessage(required, validationMessages.required),
    email: withMessage(email, validationMessages.email)
  },
  password: {
    required: withMessage(required, validationMessages.required),
    minLength: withMessage(minLength(8), validationMessages.minLength),
    passwordStrength: withMessage(
      helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      validationMessages.passwordStrength
    )
  }
}

export const editProfileSchema = {
  username: {
    required: withMessage(required, validationMessages.required),
    minLength: withMessage(minLength(6), validationMessages.minLength),
    maxLength: withMessage(maxLength(30), validationMessages.maxLength)
  },
  email: {
    required: withMessage(required, validationMessages.required),
    email: withMessage(email, validationMessages.email)
  }
}

export const createEditProfileSchema = (
  formData: ComputedRef<CurrentUserData>,
  showPetName: ComputedRef<boolean>,
  showLikedMusicGenre: ComputedRef<boolean>,
  showMostLikedPlace: ComputedRef<boolean>
) => {
  return computed(() => ({
    ...editProfileSchema,
    pet_name: {
      required: withMessage(
        () => !showPetName.value || !!formData.value.pet_name,
        'Pet name is required when you have a pet'
      )
    },
    liked_music_genre: {
      required: withMessage(
        () => !showLikedMusicGenre.value || !!formData.value.liked_music_genre,
        'Music genre is required when you have a liked music genre'
      )
    },
    most_liked_place: {
      required: withMessage(
        () => !showMostLikedPlace.value || !!formData.value.most_liked_place,
        'A specific place is required when you have a most liked place'
      )
    },
    other_place: {
      required: withMessage(
        () => formData.value.most_liked_place !== 'Outside' || !!formData.value.other_place,
        "Please specify the 'Other' place"
      )
    }
  }))
}
