<template>
  <div id="case-study" class="relative mt-24 overflow-hidden bg-white pb-24 text-slate-500">
    <div class="container mx-auto">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider">CASE STUDY</h2>
      <p class="mb-8 text-center text-lg">
        A brief story about how this process works, keep an eye till the end.
      </p>

      <div class="flex flex-wrap items-center justify-start p-6">
        <div class="relative mb-8 w-full md:mb-0 lg:w-1/2">
          <div
            class="absolute -right-10 -top-72 z-50 h-[568px] w-full bg-white px-12 py-8 shadow-2xl max-lg:right-0 max-lg:top-0 max-lg:shadow max-sm:px-1 max-sm:py-0 xl:w-10/12"
          >
            <Carousel :items-to-show="1" :wrap-around="true" :autoplay="FIVES_TIMEOUT_BUFFER">
              <Slide v-for="(card, index) in advantageCards" :key="index">
                <div class="p-10">
                  <AdvantageCard
                    :icon-src="card.iconSrc"
                    :title="card.title"
                    :description="card.description"
                    :show-button="true"
                    :decoration-filled="true"
                    :custom-gap="8"
                  />
                </div>
              </Slide>

              <template #addons>
                <Navigation />
                <Pagination />
              </template>
            </Carousel>
          </div>
        </div>
        <div
          class="w-full shadow-lg max-sm:shadow-none lg:w-1/2 xl:w-5/12"
          v-scroll-animation="{
            animationType: 'fadeIn',
            duration: 1.5,
            delay: 0.2,
            replay: true
          }"
        >
          <img
            src="/assets/section_6/r-side.jpg"
            alt="Case Study Image"
            class="h-[824px] w-full object-cover max-lg:h-[536px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdvantageCard } from '@/components'
import { FIVES_TIMEOUT_BUFFER } from '@/constant'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const advantageCards = [
  {
    iconSrc: '/assets/section_6/photography.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_6/lamp.svg',
    title: 'creative solutions',
    description:
      'Our team develops innovative and creative solutions to tackle complex business challenges.'
  },
  {
    iconSrc: '/assets/section_6/print.svg',
    title: 'targeted approach',
    description:
      'We use a targeted approach to ensure our strategies align perfectly with your business goals.'
  }
]
</script>

<style>
.carousel__prev {
  left: -10px;
}

.carousel__next {
  right: -10px;
}
</style>
