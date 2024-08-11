<template>
  <div id="works" class="relative my-24 overflow-hidden bg-white text-slate-500">
    <div class="mx-auto">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider">RECENT WORKS</h2>
      <p class="mb-8 text-center text-lg">
        It has survived not only five centuries, but also the leap scrambled it to make a type.
      </p>
      <div class="mb-20 flex justify-center">
        <Decoration />
      </div>

      <div class="flex flex-wrap">
        <div
          v-for="(work, index) in recentWorks"
          :key="index"
          class="group relative w-full overflow-hidden sm:w-6/12 lg:w-3/12"
        >
          <img :src="work.image" :alt="work.title" class="h-96 w-full object-cover" />
          <div
            class="absolute inset-0 flex flex-col items-center justify-center bg-red-500 bg-opacity-75 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <div
              class="translate-x-full transform transition-transform duration-300 group-hover:translate-x-0"
            >
              <h3 class="mb-2 text-xl font-bold">{{ work.title }}</h3>
              <p class="text-sm">{{ work.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decoration } from '@/components'
import { recentWorks } from '@/constant'
</script>
