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
        button-text="submit"
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
import { type ForgotPasswordFormData, type ForgotPasswordPayload } from '@/types'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { useFormValidation } from '@/composables'

const fields = [{ model: 'email', type: 'email', placeholder: 'Your Registered Email' }] as const

const userAction = useUserStore()
const { userMessage } = storeToRefs(useUserStore())
const { forgotPasswordSchema } = useFormValidation()
const isLoading = ref(false)

const toast = useToast()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formData = ref<ForgotPasswordFormData>({
  email: ''
})

const rules = forgotPasswordSchema
const v$ = useVuelidate(rules, formData, { $autoDirty: true })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isLoading.value = true
  try {
    const payload = formData.value
    const success = await userAction.forgotPassword(payload as ForgotPasswordPayload)
    if (success) {
      toast.success(userMessage.value)
      emit('close')
    } else {
      toast.error(userMessage.value)
      emit('close')
    }
  } catch (err) {
    toast.error((err as Error).message || userMessage.value)
    emit('close')
  } finally {
    isLoading.value = false
  }
}
</script>
