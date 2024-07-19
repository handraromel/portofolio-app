<template>
  <div id="services" class="relative my-24 overflow-hidden bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-24">
      <div class="flex">
        <div
          class="flex w-full flex-col items-center justify-center px-12 max-sm:text-center lg:w-7/12 lg:items-end"
        >
          <h2 class="mb-12 flex items-center text-4xl font-bold tracking-wider">
            OUR SERVICES<span class="ml-4 mt-1 h-8 w-1 bg-red-500"></span>
          </h2>
          <div class="space-y-14">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="flex items-center gap-5 max-sm:flex-col"
            >
              <div class="z-50">
                <CircledIcon :icon-src="service.iconSrc" :is-button="true" />
              </div>
              <div class="ml-4">
                <h3 class="text-2xl font-semibold tracking-wider text-red-500">
                  {{ service.title }}
                </h3>
                <p class="text-lg text-gray-400">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 right-0 top-0 w-5/12 max-lg:hidden"
      v-scroll-utilities="{
        type: 'animation',
        animationType: 'slideInRight',
        duration: 1.2,
        delay: 0.5,
        replay: true
      }"
    >
      <img
        v-scroll-utilities="{ type: 'lazyLoad' }"
        data-src="/assets/section_4/r-side.jpg"
        class="h-full w-full object-cover"
        alt="Services illustration"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircledIcon } from '@/components'

const services = [
  {
    title: 'WEB DESIGN',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip sum has been the industry's standard dummy text ever.",
    iconSrc: '/assets/section_4/web.svg'
  },
  {
    title: 'PRINT DESIGN',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip sum has been the industry's standard dummy text ever.",
    iconSrc: '/assets/section_4/print.svg'
  },
  {
    title: 'PHOTOGRAPHY',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip sum has been the industry's standard dummy text ever.",
    iconSrc: '/assets/section_4/photography.svg'
  }
]
</script>
