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
        button-text="register"
        :bg-color="v$.$invalid ? 'disabled' : 'primary'"
        type="submit"
        :disabled="v$.$invalid"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from 'vue-toastification'
import { Field, Button } from '@/components'
import { type RegisterFormData } from '@/types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { registerSchema } from '@/utils/formValidation'

const fields = [
  { model: 'username', type: 'text', placeholder: 'Username' },
  { model: 'email', type: 'email', placeholder: 'Email' },
  { model: 'password', type: 'password', placeholder: 'Password' }
] as const

const { authMessage } = storeToRefs(useAuthStore())
const authAction = useAuthStore()
const error = ref('')
const isLoading = ref(false)

const toast = useToast()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'info'): void
}>()

const formData = ref<RegisterFormData>({
  username: '',
  email: '',
  password: ''
})

const rules = registerSchema
const v$ = useVuelidate(rules, formData, { $autoDirty: true })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isLoading.value = true
  error.value = ''
  try {
    const success = await authAction.register(formData.value)
    if (success) {
      emit('close')
      emit('info')
    } else {
      toast.error(authMessage.value)
      emit('close')
    }
  } catch (err) {
    emit('close')
    toast.error((err as Error).message || authMessage.value)
  } finally {
    isLoading.value = false
  }
}
</script>
