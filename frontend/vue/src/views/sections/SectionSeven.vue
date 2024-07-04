<template>
  <div
    id="achievements"
    class="relative mb-24 flex h-screen items-center justify-center bg-[url('/assets/section_7/background.jpg')] bg-cover bg-center text-white md:h-[65vh]"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="container relative z-10 mx-auto px-4">
      <div class="flex flex-wrap justify-center">
        <div
          v-for="(item, index) in contents"
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

const contents = [
  {
    iconSrc: '/assets/section_7/favourite.svg',
    value: '3891',
    label: 'User Favourites'
  },
  {
    iconSrc: '/assets/section_7/post.svg',
    value: '281K',
    label: 'Posts Last 24 Hours'
  },
  {
    iconSrc: '/assets/section_7/like.svg',
    value: '618',
    label: 'Total Posts'
  },
  {
    iconSrc: '/assets/section_7/campaign.svg',
    value: '178',
    label: 'Campaigns'
  },
  {
    iconSrc: '/assets/section_7/feature.svg',
    value: '285',
    label: 'Amazing Features'
  }
]
</script>
