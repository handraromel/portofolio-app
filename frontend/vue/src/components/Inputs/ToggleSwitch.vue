<template>
  <div class="flex items-center">
    <Switch
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full',
        modelValue ? 'bg-red-500' : 'bg-slate-200',
        disabled && 'bg-slate-200'
      ]"
      :disabled="disabled"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
      />
    </Switch>
    <span class="ml-3 text-sm font-medium text-gray-700">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'

defineProps<{
  modelValue: boolean
  label?: string
  disabled?: boolean
}>()
defineEmits(['update:modelValue'])
</script>
