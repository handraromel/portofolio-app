<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
        error ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-red-400/50'
      ]"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  type: string
  modelValue: string
  error?: string
}>()
defineEmits(['update:modelValue'])
</script>
