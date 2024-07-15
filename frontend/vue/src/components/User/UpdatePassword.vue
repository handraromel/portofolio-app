<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, index) in fields" :key="index" class="mb-4">
      <Field
        :type="field.type"
        :placeholder="field.placeholder"
        v-model="formData[field.model]"
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
import { type PasswordUpdateFormData, type PasswordUpdatePayload } from '@/types'
import { storeToRefs } from 'pinia'
import { useAuthStore, useUserStore } from '@/stores'
import { useFormValidation } from '@/composables'

const fields = [
  { model: 'old_password', type: 'password', placeholder: 'Your Old Password' },
  { model: 'new_password', type: 'password', placeholder: 'Your New Password' },
  { model: 'confirm_password', type: 'password', placeholder: 'Confirm Your Password' }
] as const

const authStore = useAuthStore()
const userStore = useUserStore()
const { userMessage } = storeToRefs(useUserStore())
const { passwordUpdateSchema } = useFormValidation()
const isLoading = ref(false)

const toast = useToast()
const currentUserId = authStore.getUserId

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formData = ref<PasswordUpdateFormData>({
  old_password: '',
  new_password: '',
  confirm_password: ''
})

const rules = passwordUpdateSchema
const v$ = useVuelidate(rules, formData, { $autoDirty: true })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isLoading.value = true
  try {
    const { confirm_password, ...payload } = formData.value
    console.log(payload)
    const success = await userStore.updatePassword(currentUserId, payload as PasswordUpdatePayload)
    if (success) {
      toast.success(userMessage.value)
      emit('close')
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
