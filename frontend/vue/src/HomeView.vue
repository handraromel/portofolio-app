<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-700 p-4">
    <div class="mx-auto flex w-full max-w-7xl flex-col bg-black text-white lg:flex-row">
      <div
        class="flex w-full flex-row items-center justify-between bg-white p-5 text-black lg:w-1/5 lg:flex-col lg:items-start"
      >
        <img class="h-16 w-16 object-contain lg:h-20 lg:w-20" src="/favicon.svg" alt="Logo" />
        <div class="mt-4 flex flex-col text-sm lg:mt-0">
          <span class="mb-1">Get in touch!</span>
          <a
            href="mailto:handromel@gmail.com"
            target="_blank"
            class="boxShadow-glow inline-block animate-pulse-glow text-blue-600 transition-colors duration-300 hover:text-blue-800"
          >
            handromel@gmail.com
          </a>
        </div>
      </div>

      <div
        class="flex w-full flex-col bg-[url('/assets/homepage/bg.jpg')] bg-cover bg-center p-6 lg:w-4/5 lg:flex-row lg:p-10"
      >
        <div class="mb-6 w-full pr-0 lg:mb-0 lg:w-1/2 lg:pr-6">
          <div class="mb-5 w-full">
            <h1 class="mb-2 text-3xl font-bold lg:text-4xl">Handra Romel</h1>
            <h2 class="mb-5 text-xl text-slate-400 lg:text-2xl">Software Engineer (Web)</h2>
            <p class="lg:text-md mb-5 text-sm">
              Welcome to my professional portfolio. This page showcases my expertise in web
              application development and highlights the technologies I specialize in. Whether
              you're a potential client or employer, I hope this overview provides valuable insights
              into my capabilities as a software engineer.
            </p>
          </div>
          <div v-for="(item, index) in items" :key="index">
            <div class="my-6 w-full lg:my-9">
              <h3 class="mb-2 text-lg font-semibold lg:text-xl">{{ item.title }}</h3>
              <p class="mb-2 text-sm text-slate-300">
                {{ item.description }}
              </p>
              <table class="mb-4 w-full items-start text-xs lg:mb-7 lg:text-sm">
                <tr class="align-top">
                  <td class="py-2 pr-4 font-semibold">Stacks:</td>
                  <td class="py-2">
                    <span class="inline-flex flex-wrap gap-2">
                      <span
                        v-for="(stack, index) in item.stacks.split(',')"
                        :key="index"
                        class="rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-white transition-transform duration-300 hover:scale-110"
                      >
                        {{ stack.trim() }}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
              <div class="flex space-x-2">
                <a
                  :href="item.url"
                  :target="item.target"
                  rel="noopener noreferrer"
                  class="group relative inline-block cursor-pointer overflow-hidden bg-gray-700 px-4 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:text-black hover:shadow-lg lg:px-6 lg:text-base"
                >
                  <span class="relative z-10 font-semibold">Check it out!</span>
                  <span
                    class="absolute inset-0 translate-x-[-100%] transform bg-white transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                  ></span>
                </a>
                <a
                  :href="item.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden bg-gray-700 px-3 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:text-black hover:shadow-lg lg:text-base"
                >
                  <span class="relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="transition-colors duration-100 ease-in-out"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                      ></path>
                    </svg>
                  </span>
                  <span
                    class="absolute inset-0 translate-x-[-100%] transform bg-white transition-transform duration-300 ease-in-out group-hover:translate-x-0"
                  ></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full items-center justify-center sm:justify-end lg:w-1/2 lg:items-start">
          <img
            src="/assets/homepage/profile.jpg"
            alt="Handra Romel"
            class="h-[375px] w-[375px] object-contain grayscale filter transition-all duration-500 hover:filter-none lg:h-[450px] lg:w-[450px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    title: 'Company Landing Page',
    description:
      'This page intended to showcase an example of an informative landing page with a focus on user experience, featured with user authentication, account management, profile customization, and a feedback system.',
    stacks: 'Vue 3, Tailwind CSS, Headless UI, Express.js, Sequelize, MySQL',
    url: '/vue-express-portofolio/',
    target: '_blank',
    github: 'https://github.com/handraromel/portofolio-app'
  },
  {
    title: 'Tracquiry',
    description:
      'This project main purpose is to manage expenses. This project current state is capable to manage a small family expense tracking, resembling the name Traquiry, Track your own enquiry.',
    stacks: 'Next.js with typescript, Zustand, Tanstack React Query, Tailwind CSS, Headless UI, FastAPI, PostgreSQL',
    url: 'https://tracquiry.handraromel.site',
    target: '_blank',
    github: 'https://github.com/handraromel/expense-management-system'
  }
])
</script>

<style>
@keyframes pulse-glow {
  0%,
  100% {
    text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s infinite;
}
</style>
