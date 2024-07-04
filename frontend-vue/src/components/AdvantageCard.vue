<template>
  <div
    :class="[
      'flex flex-col items-center text-center transition-all duration-300 ease-in-out',
      customGap ? `gap-${customGap}` : 'gap-5 max-sm:gap-3'
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="[
        'mb-4 flex h-16 w-16 items-center justify-center border transition-all duration-300 ease-in-out',
        isHovered ? 'rotate-45 border-red-500' : 'border-gray-300',
        decorationFilled ? 'border-red rotate-45 bg-red-500' : ''
      ]"
    >
      <img
        :src="iconSrc"
        :alt="title"
        class="h-6 w-6 object-contain transition-all duration-300 ease-in-out"
        :class="{ '-rotate-45': isHovered || decorationFilled }"
      />
    </div>
    <h3 class="mb-2 text-2xl font-semibold uppercase">{{ title }}</h3>
    <div class="mb-4 h-px w-12 bg-red-500"></div>
    <p class="text-lg text-slate-500 max-sm:px-5">{{ description }}</p>
    <Button v-if="showButton" button-text="read more" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '.'
import { type AdvantageCardProps } from '@/types'

const props = defineProps<AdvantageCardProps>()

const isHovered = ref(false)

const handleMouseEnter = () => {
  if (!props.decorationFilled) {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>
