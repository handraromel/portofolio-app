<template>
  <form @submit.prevent="handleSubmit">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showMessage"
        class="mb-4 rounded-md border px-2 py-1 text-sm transition-colors duration-300"
        :class="
          isError
            ? 'border-red-500 bg-red-100 text-red-700'
            : 'border-blue-500 bg-blue-100 text-blue-700'
        "
      >
        <p v-if="isError">{{ userMessage }}</p>
        <p v-else>Please use dummy/personal data as this site is for showcase only.</p>
      </div>
    </Transition>
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
import { ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { Field, Button } from '@/components'
import { type RegisterFormData, type RegisterPayload } from './types'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useFormValidation } from '@/composables'
import { useTimeoutFn } from '@vueuse/core'

const fields = [
  { model: 'username', type: 'text', placeholder: 'Username' },
  { model: 'email', type: 'email', placeholder: 'Email' },
  { model: 'password', type: 'password', placeholder: 'Password' },
  { model: 'confirm_password', type: 'password', placeholder: 'Confirm Your Password' }
] as const

const { userMessage } = storeToRefs(useAuthStore())
const authStore = useAuthStore()
const { registerSchema } = useFormValidation()
const isLoading = ref(false)
const isError = ref(false)
const showMessage = ref(true)

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
  isError.value = false
  showMessage.value = false
  try {
    const { confirm_password, ...payload } = formData.value
    const success = await authStore.register(payload as RegisterPayload)
    if (success) {
      emit('close')
      emit('info')
      useTimeoutFn(() => {
        showMessage.value = true
      }, 5000)
    } else {
      isError.value = true
      showMessage.value = true
      useTimeoutFn(() => {
        isError.value = false
        showMessage.value = true
      }, 5000)
    }
  } catch (err) {
    isError.value = true
    showMessage.value = true
    useTimeoutFn(() => {
      isError.value = false
      showMessage.value = true
    }, 5000)
  } finally {
    isLoading.value = false
  }
}

watch(userMessage, (newMessage) => {
  if (newMessage) {
    isError.value = true
    showMessage.value = true
    useTimeoutFn(() => {
      isError.value = false
      showMessage.value = true
    }, 5000)
  }
})
</script>
