<template>
  <div class="mb-4">
    <label :for="id" class="mb-2 block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <div class="h-2 rounded-full bg-gray-200">
        <div
          class="absolute h-2 rounded-full"
          :style="{
            width: `${modelValue}%`,
            backgroundColor: colorizeBg ? valueColor : '#3b82f6'
          }"
        ></div>
      </div>
      <input
        :id="id"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        @input="handleInput"
        class="absolute top-0 h-2 w-full cursor-pointer opacity-0"
      />
      <div
        class="absolute -ml-2 -mt-1 h-2 w-2 -translate-y-1/2 rotate-180 transform"
        :style="{ left: `${modelValue}%`, top: '150%' }"
      >
        <div
          class="h-4 w-4 rounded-full border-solid bg-slate-700 ring-2 ring-inset ring-slate-300"
        ></div>
      </div>
    </div>
    <div v-if="displayValue" class="mt-2 text-center font-semibold" :style="{ color: valueColor }">
      {{ modelValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type SliderInputProps } from '@/types'

const props = withDefaults(defineProps<SliderInputProps>(), {
  min: 0,
  max: 100,
  step: 1,
  colorizeBg: false,
  displayValue: false
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', Number(target.value))
}

const valueColor = computed(() => {
  const range = props.max - props.min
  const value = props.modelValue - props.min
  if (value <= range / 3) return '#EF4444' // red
  if (value <= (range * 2) / 3) return '#F59E0B' // amber
  return '#10B981' // green
})
</script>
