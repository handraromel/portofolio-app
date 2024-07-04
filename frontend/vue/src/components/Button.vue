<template>
  <button
    :class="[
      'flex items-center justify-center rounded-sm py-1.5',
      'lg:text-md text-sm uppercase outline outline-offset-1 transition duration-300 ease-in-out',
      'disabled font-semibold hover:outline-2 hover:drop-shadow-lg',
      themeClasses,
      fixedWidth ? 'w-[200px]' : 'w-auto px-5'
    ]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ButtonProps } from '@/types'

const props = withDefaults(defineProps<ButtonProps>(), {
  bgColor: 'primary',
  type: 'button'
})

const themeClasses = computed(() => {
  switch (props.bgColor) {
    case 'primary':
      return 'bg-red-400 text-white outline-red-500 hover:bg-red-500'
    case 'transparent':
      return 'bg-transparent text-white outline-white hover:bg-white hover:text-black'
    case 'secondary':
      return 'bg-white outline-white drop-shadow-md hover:drop-shadow'
    default:
      return `bg-slate-400 text-white outline-slate-500 ${props.disabled ? '' : 'hover:bg-slate-500'}`
  }
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (props.type !== 'submit') {
    event.preventDefault()
  }
  emit('click', event)
}
</script>
