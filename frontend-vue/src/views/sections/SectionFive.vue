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
const recentWorks = [
  { image: '/assets/section_5/img1.jpg', title: 'Web Design', category: 'Web / Design' },
  {
    image: '/assets/section_5/img2.jpg',
    title: 'T-Shirt Design',
    category: 'Art / T-shirt'
  },
  {
    image: '/assets/section_5/img3.jpg',
    title: 'Resume Design',
    category: 'Print / Design'
  },
  {
    image: '/assets/section_5/img4.jpg',
    title: 'Mobile App',
    category: 'App / Development'
  },
  {
    image: '/assets/section_5/img5.jpg',
    title: 'Logo Design',
    category: 'Branding / Design'
  },
  {
    image: '/assets/section_5/img6.jpg',
    title: 'Business Card',
    category: 'Print / Design'
  },
  { image: '/assets/section_5/img7.jpg', title: 'Mobile UI', category: 'UI / UX' },
  {
    image: '/assets/section_5/img8.jpg',
    title: 'Responsive Design',
    category: 'Web / Design'
  }
]
</script>
