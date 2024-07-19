<template>
  <div id="our-blog" class="my-24 overflow-hidden bg-white text-slate-500">
    <div class="container mx-auto px-4">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider text-gray-800">OUR BLOG</h2>
      <p class="mb-8 text-center text-lg text-gray-600">
        Suspendisse sed eros malis, tincidunt felis eget, interdum eratullam sit amet odio.
      </p>
      <div class="mb-20 flex justify-center">
        <Decoration />
      </div>
      <div
        class="flex flex-wrap"
        v-scroll-utilities="{
          type: 'animation',
          animationType: 'slideUp',
          duration: 1.2,
          delay: 0.75,
          replay: true,
          stagger: 0.15
        }"
      >
        <div
          v-for="(content, index) in blogContent"
          :key="index"
          class="group relative flex w-full p-2 max-sm:flex-col xl:w-1/2"
        >
          <div class="relative z-10 w-1/2 max-sm:w-full">
            <img
              v-scroll-utilities="{ type: 'lazyLoad' }"
              :data-src="content.image"
              :alt="content.title"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            class="z-30 flex w-1/2 flex-col justify-center overflow-hidden bg-red-500 p-8 text-white max-sm:w-full"
          >
            <p class="mb-2 text-sm uppercase">{{ content.topSubtitle }}</p>
            <h3 class="mb-4 text-2xl font-bold tracking-wider">{{ content.title }}</h3>
            <p class="mb-4 text-sm leading-relaxed">{{ content.description }}</p>
            <div class="flex flex-row items-center">
              <a
                href="javascript:"
                class="relative text-sm transition-all duration-300 group-hover:font-semibold"
                @click="openModal(content)"
              >
                <span class="relative z-10">Read More</span>
                <span
                  class="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-[140%]"
                ></span>
              </a>
              <img src="/assets/section_10/arrow.svg" class="ml-2 h-5 w-5" alt="Arrow Icon" />
            </div>
          </div>
          <div
            class="absolute z-20 translate-x-full transform transition-transform duration-300 ease-in-out max-sm:hidden max-sm:group-hover:-translate-y-10 sm:left-[40%] sm:top-[40%] sm:group-hover:translate-x-10"
          >
            <img
              class="h-20 w-20 rotate-180 max-sm:-rotate-90"
              src="/assets/section_10/play.svg"
              alt="Decoration"
            />
          </div>
        </div>
      </div>
      <div class="mt-16 flex items-center justify-center">
        <a href="javascript:" class="group relative text-xl uppercase hover:font-semibold">
          <span class="relative z-10">More of Our Posts</span>
          <span
            class="absolute bottom-0 left-0 h-0.5 w-full bg-slate-500 transition-all duration-300 sm:w-0 sm:group-hover:w-full"
          ></span>
        </a>
      </div>
    </div>
  </div>

  <Modal
    :is-open="isModalOpen"
    @close="closeModal"
    :title="selectedPost?.title"
    size="lg"
    :show-close-icon="true"
  >
    <div v-if="selectedPost">
      <img
        v-scroll-utilities="{ type: 'lazyLoad' }"
        :data-src="selectedPost.image"
        :alt="selectedPost.title"
        class="mb-4 w-full object-cover"
      />
      <p class="mb-2 text-sm uppercase text-gray-500">{{ selectedPost.topSubtitle }}</p>
      <p class="text-gray-700">{{ selectedPost.description }}</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Decoration, Modal } from '@/components'
import { type BlogPost } from '@/types'

const isModalOpen = ref(false)
const selectedPost = ref<BlogPost | null>(null)

const closeModal = () => {
  isModalOpen.value = false
}

const openModal = (post: BlogPost) => {
  selectedPost.value = post
  isModalOpen.value = true
}

const blogContent: BlogPost[] = [
  {
    image: '/assets/section_10/blog1.jpg',
    topSubtitle: 'lifestyle / coffee',
    title: 'NUMERO UNO ESPRESSO',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu Stry's standard dummy text ever since the 1500s, an unknown printer took a galley of type a scrambled it to make a type specimen book."
  },
  {
    image: '/assets/section_10/blog2.jpg',
    topSubtitle: 'lifestyle / watch',
    title: 'LEGENDARY WATCH',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu Stry's standard dummy text ever since the 1500s, an unknown printer took a galley of type a scrambled it to make a type specimen book."
  },

  {
    image: '/assets/section_10/blog3.jpg',
    topSubtitle: 'adventure / trip',
    title: 'A RELAXING TRIP',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu Stry's standard dummy text ever since the 1500s, an unknown printer took a galley of type a scrambled it to make a type specimen book."
  },
  {
    image: '/assets/section_10/blog4.jpg',
    topSubtitle: 'lifestyle / classic cars',
    title: 'HOW TO MAINTAIN YOUR CLASSICS',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu Stry's standard dummy text ever since the 1500s, an unknown printer took a galley of type a scrambled it to make a type specimen book."
  }
]
</script>
