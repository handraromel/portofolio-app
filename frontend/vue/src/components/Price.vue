<template>
  <div
    class="relative flex flex-col overflow-hidden rounded bg-gray-100 transition-all duration-300 ease-in-out"
    :class="{ 'scale-105 transform shadow-lg max-sm:scale-100': isActive }"
  >
    <div
      class="flex h-40 justify-center px-6 pt-5"
      :class="[isActive ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800']"
    >
      <h3 class="text-center text-xl font-bold tracking-wider">{{ planName }}</h3>
    </div>
    <div class="flex flex-col items-center px-6 py-8">
      <div
        class="absolute top-24 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-md"
      >
        <span class="text-3xl font-bold text-gray-800">${{ price }}</span>
        <span class="text-xs text-gray-500">per month</span>
      </div>
      <ul class="mt-20 space-y-2 text-center text-sm text-gray-600">
        <li v-for="feature in features" :key="feature">{{ feature }}</li>
      </ul>
      <div class="mt-20">
        <Button
          button-text="choose plan"
          :bg-color="isActive ? 'primary' : 'disabled'"
          :disabled="!isActive"
          @click="$emit('openModal')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components'
import { type PriceProps } from '@/types'

defineProps<PriceProps>()

defineEmits(['openModal'])
</script>
