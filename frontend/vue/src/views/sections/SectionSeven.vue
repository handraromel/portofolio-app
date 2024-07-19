<template>
  <div
    id="achievements"
    v-scroll-utilities="{ type: 'lazyLoad' }"
    data-src="/assets/section_7/background.jpg"
    class="relative mb-24 flex h-screen items-center justify-center bg-cover bg-center text-white md:h-[65vh]"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="container relative z-10 mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div
          v-for="(item, index) in achievementContent"
          :key="index"
          class="flex w-1/2 flex-col items-center p-4 sm:w-1/2 md:w-1/3 lg:w-1/5"
        >
          <div class="mb-2 rounded-full border border-white p-4">
            <CircledIcon :icon-src="item.iconSrc" :is-transparent="true" size="large" />
          </div>
          <h3 class="my-1 text-2xl font-bold">{{ item.value }}</h3>
          <p class="text-lg">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircledIcon } from '@/components'
import { achievementContent } from '@/constant'
</script>
