<template>
  <Form @submit="handleSubmit" :validation-schema="signInSchema" v-slot="{ errors }">
    <div v-for="(field, index) in fields" :key="index" class="mb-4">
      <Field :name="field.model" v-slot="{ field: veeField, errorMessage }">
        <input
          v-bind="veeField"
          :type="field.type"
          :placeholder="field.placeholder"
          class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
        />
        <span class="text-sm text-red-500">{{ errorMessage }}</span>
      </Field>
    </div>
    <div class="mt-10 flex w-full justify-end gap-4 pr-0.5">
      <Button button-text="cancel" bg-color="secondary" type="button" @click="$emit('cancel')" />
      <Button button-text="sign in" type="submit" :disabled="checkFormErrors(errors)" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, type SubmissionHandler } from 'vee-validate'
import { Button } from '@/components'
import { type SignInFormData } from '@/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useToast } from 'vue-toastification'
import { signInSchema } from '@/utils/formValidation'
import { checkFormErrors } from '@/utils/common'

const fields = [
  { model: 'email', type: 'email', placeholder: 'Email' },
  { model: 'password', type: 'password', placeholder: 'Password' }
] as const

const authAction = useAuthStore()
const { authMessage } = storeToRefs(useAuthStore())
const isLoading = ref(false)
const toast = useToast()

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error'): void
  (e: 'cancel'): void
}>()

const handleSubmit: SubmissionHandler = async (payload: Record<string, any>) => {
  isLoading.value = true
  try {
    const success = await authAction.login(payload as SignInFormData)
    if (success) {
      toast.success(authMessage.value)
      emit('success')
    } else {
      toast.error(authMessage.value)
      emit('error')
    }
  } catch (err) {
    emit('error')
    toast.error('An error occurred. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>
