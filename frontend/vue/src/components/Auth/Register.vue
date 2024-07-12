<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, index) in fields" :key="index" class="mb-4">
      <Field
        :type="field.type"
        :placeholder="field.placeholder"
        v-model="formData[field.model]"
        :name="field.model"
        :error="v$[field.model].$errors[0]?.$message as string"
      />
    </div>
    <div class="mt-10 flex w-full justify-end gap-4 pr-0.5">
      <Button button-text="cancel" bg-color="secondary" type="button" @click="$emit('close')" />
      <Button
        button-text="register"
        type="submit"
        :bg-color="v$.$invalid ? 'disabled' : 'primary'"
        :disabled="v$.$invalid"
        :loading-state="isLoading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from 'vue-toastification'
import { Field, Button } from '@/components'
import { type RegisterFormData, type RegisterPayload } from '@/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useFormValidation } from '@/composables'

const fields = [
  { model: 'username', type: 'text', placeholder: 'Username' },
  { model: 'email', type: 'email', placeholder: 'Email' },
  { model: 'password', type: 'password', placeholder: 'Password' },
  { model: 'confirm_password', type: 'password', placeholder: 'Confirm Your Password' }
] as const

const { userMessage } = storeToRefs(useAuthStore())
const authAction = useAuthStore()
const { registerSchema } = useFormValidation()
const isLoading = ref(false)

const toast = useToast()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'info'): void
}>()

const formData = ref<RegisterFormData>({
  username: '',
  email: '',
  password: '',
  confirm_password: ''
})

const rules = registerSchema
const v$ = useVuelidate(rules, formData, { $autoDirty: true })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isLoading.value = true
  try {
    const { confirm_password, ...payload } = formData.value
    const success = await authAction.register(payload as RegisterPayload)
    if (success) {
      emit('close')
      emit('info')
    } else {
      toast.error(userMessage.value)
      emit('close')
    }
  } catch (err) {
    emit('close')
    toast.error((err as Error).message || userMessage.value)
  } finally {
    isLoading.value = false
  }
}
</script>
