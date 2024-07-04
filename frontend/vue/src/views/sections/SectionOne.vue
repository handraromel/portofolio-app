<template>
  <div
    id="home"
    class="flex h-screen items-center justify-center bg-[url('/assets/section_1/background.jpg')] bg-cover bg-center text-white"
  >
    <div class="container mx-auto px-4 text-center max-sm:mb-10">
      <div class="flex flex-col gap-9 max-sm:gap-6">
        <div id="header-subtitle" class="mx-5 text-3xl">
          <p>Our Clients Are Our First Priority</p>
        </div>
        <div
          id="header-title"
          class="mx-5 text-5xl font-semibold tracking-widest lg:text-6xl xl:text-8xl"
        >
          <p>WELCOME TO BINO</p>
        </div>
        <div id="header-separator" class="flex justify-center">
          <Decoration />
        </div>
        <div id="header-desc" class="mx-8 pb-14 text-xl max-sm:pb-4 lg:mx-48 xl:mx-[22rem]">
          <p class="leading-9 max-sm:leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div id="buttons" class="flex justify-center">
          <div class="flex flex-wrap justify-center gap-8">
            <div>
              <Button button-text="get started now" :fixed-width="true" />
            </div>
            <div>
              <Button
                button-text="learn more"
                bg-color="transparent"
                :fixed-width="true"
                @click="scrollToAdvantage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-[-0.9%]">
      <a href="#advantage" v-smooth-scroll>
        <CircledIcon icon-src="/assets/section_1/anchor.png" :is-button="true" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, CircledIcon, Decoration } from '@/components'

import { useSmoothScroll } from '@/composables'

const { scrollToElement } = useSmoothScroll()

const scrollToAdvantage = () => {
  scrollToElement('advantage', '#advantage')
}
</script>
