<template>
  <div id="advantage" class="my-24 flex items-center justify-center text-slate-500">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap">
        <div
          v-for="(card, index) in advantageCards"
          class="w-full p-6 sm:w-1/2 lg:w-1/4"
          :key="index"
        >
          <AdvantageCard
            :icon-src="card.iconSrc"
            :title="card.title"
            :description="card.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdvantageCard } from '@/components'

const advantageCards = [
  {
    iconSrc: '/assets/section_2/sleek-design.svg',
    title: 'sleek design',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/clean-code.svg',
    title: 'clean code',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/creative-idea.svg',
    title: 'creative idea',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  },
  {
    iconSrc: '/assets/section_2/free-support.svg',
    title: 'free support',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting let. Lorem Ipsum has been the industry.'
  }
]
</script>
