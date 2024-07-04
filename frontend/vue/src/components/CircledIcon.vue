<template>
  <component
    :is="isButton ? 'button' : 'div'"
    :class="[
      'flex items-center justify-center rounded-full',
      'transition-all duration-300 ease-in-out',
      outerSizeClasses,
      isButton ? 'cursor-pointer hover:bg-slate-400' : '',
      isTransparent ? 'bg-transparent' : 'bg-slate-400/40'
    ]"
  >
    <div
      :class="[
        'flex items-center justify-center rounded-full',
        innerSizeClasses,
        isTransparent ? 'bg-transparent' : 'bg-white'
      ]"
    >
      <img :src="iconSrc" :alt="alt" :class="['object-contain', iconSizeClasses]" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type CircledIconProps } from '@/types'

const props = withDefaults(defineProps<CircledIconProps>(), {
  size: 'medium',
  alt: 'Icon',
  isButton: false
})

const outerSizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-12 h-12'
    case 'large':
      return 'w-20 h-20'
    default:
      return 'w-14 h-14'
  }
})

const innerSizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-8 h-8'
    case 'large':
      return 'w-16 h-16'
    default:
      return 'w-12 h-12'
  }
})

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-4 h-4'
    case 'large':
      return 'w-8 h-8'
    default:
      return 'w-6 h-6'
  }
})
</script>
