<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :name="name"
      @input="handleInput"
      :class="[
        'block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
        error ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-red-400/50'
      ]"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  name?: string
  type: string
  modelValue: string
  placeholder?: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
