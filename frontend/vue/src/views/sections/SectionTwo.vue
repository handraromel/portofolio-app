<template>
  <div id="advantage" class="my-24 flex items-center justify-center text-slate-500">
    <div class="container mx-auto px-4">
      <div
        v-scroll-animation="{
          animationType: 'slideUp',
          duration: 1.2,
          delay: 0.2,
          replay: true
        }"
        class="flex flex-wrap"
      >
        <div
          v-for="(card, index) in advantageCardContent"
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
import { advantageCardContent } from '@/constant'
</script>
