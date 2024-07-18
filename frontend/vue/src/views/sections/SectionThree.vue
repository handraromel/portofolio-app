<template>
  <div id="history" class="my-24 flex items-center justify-center text-slate-500">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap p-6">
        <div
          class="mb-20 flex w-full justify-center px-5 sm:px-20 lg:mb-0 lg:w-1/2"
          v-scroll-animation="{
            animationType: 'slideInLeft',
            duration: 1.2,
            delay: 0.2,
            replay: true
          }"
        >
          <img
            src="/assets/section_3/monitor.png"
            alt="iMac displaying website"
            class="h-auto w-full object-contain"
          />
        </div>

        <div class="flex w-full flex-col justify-center gap-8 px-5 lg:w-1/2">
          <h2 class="mb-4 flex items-center text-4xl font-bold tracking-wider">
            <span class="mr-4 mt-1 h-8 w-1 bg-red-500"></span>
            OUR HISTORY
          </h2>
          <p class="mb-6 text-lg text-slate-500">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <p class="mb-8 text-lg text-slate-500">
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <Button button-text="browse our work" :fixed-width="true" @click="scrollToWorks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components'
import { useSmoothScroll } from '@/composables'

const { scrollToElement } = useSmoothScroll()

const scrollToWorks = () => {
  scrollToElement('works', '#works')
}
</script>
