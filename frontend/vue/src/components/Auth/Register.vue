<!-- Register.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, index) in fields" :key="index" class="mb-4">
      <input
        v-model="formData[field.model]"
        :type="field.type"
        :placeholder="field.placeholder"
        class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
      />
    </div>
    <div class="mt-10 flex w-full justify-end gap-4 pr-0.5">
      <Button button-text="cancel" bg-color="secondary" type="button" @click="$emit('cancel')" />
      <Button button-text="register" type="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components'
import { type RegisterFormData } from '@/types'

const fields = [
  { model: 'username', type: 'text', placeholder: 'Username' },
  { model: 'email', type: 'email', placeholder: 'Email' },
  { model: 'password', type: 'password', placeholder: 'Password' },
  { model: 'firstName', type: 'text', placeholder: 'First Name' },
  { model: 'lastName', type: 'text', placeholder: 'Last Name' }
] as const

const formData = ref<RegisterFormData>({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: ''
})

const emit = defineEmits<{
  (e: 'submit', formData: RegisterFormData): void
  (e: 'cancel'): void
}>()

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
