<template>
  <button
    :class="[
      'flex items-center justify-center rounded-sm tracking-wider',
      'outline outline-2 outline-offset-2 transition duration-300 ease-in-out',
      'disabled font-semibold hover:drop-shadow-lg',
      themeClasses,
      fixedWidth ? 'w-[200px]' : 'w-auto',
      getTextSize || 'text-sm',
      uppercase && 'uppercase'
    ]"
    :disabled="disabled || loadingState"
    :type="type"
    @click="handleClick"
  >
    <template v-if="loadingState">
      <div
        class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent"
      ></div>
      processing
    </template>
    <template v-else>
      {{ buttonText }}
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ButtonProps } from '@/types'

const props = withDefaults(defineProps<ButtonProps>(), {
  bgColor: 'primary',
  type: 'button',
  uppercase: true
})

const themeClasses = computed(() => {
  switch (props.bgColor) {
    case 'primary':
      return 'bg-red-400 text-white outline-red-500 hover:bg-red-600 py-1.5 px-5'
    case 'transparent':
      return 'bg-transparent text-white outline-white hover:bg-white hover:text-black py-1.5 px-5'
    case 'secondary':
      return 'bg-white outline-white drop-shadow-md hover:drop-shadow py-1.5 px-5'
    case 'info':
      return 'bg-sky-400 outline-sky-500 text-white hover:bg-sky-600 py-1.5 px-5'
    case 'link':
      return 'p-0 m-0 bg-transparent border-none outline-none text-blue-600 group-hover:text-blue-800 group-hover:underline cursor-pointer'
    default:
      return `bg-slate-400 text-white outline-slate-500 ${props.disabled ? '' : 'hover:bg-slate-500'} py-1.5 px-5`
  }
})

const getTextSize = computed(() => {
  switch (props.textSize) {
    case 'xs':
      return 'text-[10px]'
    case 'sm':
      return 'text-[12px]'
    case 'md':
      return 'text-[14px]'
    case 'lg':
      return 'text-[16px]'
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
