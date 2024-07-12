<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :value="modelValue"
      :name="name"
      @input="handleInput"
      :class="fieldClasses"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
    <input
      v-else
      :id="id"
      :type="type"
      :value="modelValue"
      :name="name"
      @input="handleInput"
      :class="fieldClasses"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type inputType = 'text' | 'email' | 'password' | 'textarea'

const props = defineProps<{
  id?: string
  label?: string
  name?: string
  type: inputType
  modelValue: string
  placeholder?: string
  error?: string
  isTextarea?: boolean
  rows?: number
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const fieldClasses = computed(() => [
  'block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
  props.error ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-red-400/50'
])
</script>
