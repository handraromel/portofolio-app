<template>
  <div class="mb-4">
    <label :for="id" class="mb-2 block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <div class="h-2 rounded-full bg-gray-200">
        <div
          class="absolute h-2 rounded-full"
          :style="{
            width: `${modelValue}%`,
            backgroundColor: colorizeBg ? scoreColor : '#3b82f6'
          }"
        ></div>
      </div>
      <input
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', parseInt($event.target.value))"
        type="range"
        min="0"
        max="100"
        step="1"
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
    <div v-if="displayValue" class="mt-2 text-center font-semibold" :style="{ color: scoreColor }">
      {{ modelValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: number
  displayValue?: boolean
  colorizeBg?: boolean
}>()

defineEmits(['update:modelValue'])

const scoreColor = computed(() => {
  if (props.modelValue <= 33) return '#EF4444'
  if (props.modelValue <= 66) return '#F59E0B'
  return '#10B981'
})
</script>
