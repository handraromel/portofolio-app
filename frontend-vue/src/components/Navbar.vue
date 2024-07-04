<template>
  <nav
    :class="[
      'fixed z-[100] w-full transition-all duration-300 ease-in-out',
      scrolled || mobileMenuOpen ? 'max-h-full bg-gray-800 pt-0' : 'max-h-0 bg-transparent pt-5'
    ]"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="logo mr-5 w-2/12">
          <img class="object-contain" src="/assets/navbar/logo.png" alt="Navbar Logo" />
        </div>

        <div
          class="hidden md:flex md:w-9/12 md:flex-wrap md:justify-end md:gap-x-8 md:gap-y-4 xl:gap-x-3 xl:gap-y-8"
        >
          <a
            v-for="item in menuItems"
            :key="item"
            :class="[
              'whitespace-nowrap px-2 font-normal tracking-wider text-white transition-all duration-300 ease-in-out hover:rounded-sm hover:bg-red-500',
              item === activeItem ? 'rounded-sm bg-red-500' : ''
            ]"
            :href="'#' + hyphenize(item)"
            v-smooth-scroll
            @click="updateHashAndActiveItem(item)"
          >
            {{ item }}
          </a>
        </div>

        <div class="flex w-9/12 justify-end pr-5 md:hidden">
          <button @click="toggleMobileMenu" class="text-white focus:outline-none">
            <svg
              class="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex justify-end md:w-1/12">
          <UserMenu />
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      :class="[
        'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
        mobileMenuOpen ? 'max-h-[50rem]' : 'max-h-0'
      ]"
    >
      <div class="px-4 py-2">
        <a
          v-for="item in menuItems"
          :key="item"
          :class="['block rounded p-2 text-white', item === activeItem ? 'bg-red-500' : '']"
          :href="'#' + hyphenize(item)"
          @click="toggleMobileMenu"
          v-smooth-scroll
        >
          {{ item }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { hyphenize } from '@/utils/stringUtils'
import { UserMenu } from '@/components'
import { useScroll, useIntersectionObserver } from '@vueuse/core'
import { useRouteHash } from '@vueuse/router'

const { y: scrollY } = useScroll(window)
const scrolled = computed(() => scrollY.value > 50)
const mobileMenuOpen = ref(false)
const currentHash = useRouteHash()

const menuItems = [
  'HOME',
  'ADVANTAGE',
  'HISTORY',
  'SERVICES',
  'WORKS',
  'CASE STUDY',
  'ACHIEVEMENTS',
  'PRICING',
  'OUR BLOG',
  'CONTACT'
]

const updateHashAndActiveItem = (item: string, updateHash: boolean = true) => {
  if (updateHash) {
    const hash = '#' + hyphenize(item)
    history.pushState(null, '', hash)
  }
  currentHash.value = '#' + hyphenize(item)
}

const activeItem = computed(() => {
  const hash = currentHash.value?.slice(1) // Remove the leading '#'
  const matchingItem = menuItems.find(
    (item) => hyphenize(item).toLowerCase() === hash?.toLowerCase()
  )
  return matchingItem || 'HOME'
})

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const setupIntersectionObservers = () => {
  menuItems.forEach((item) => {
    const targetId = hyphenize(item)
    const target = document.getElementById(targetId)
    if (target) {
      useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            updateHashAndActiveItem(item, false)
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        }
      )
    }
  })
}

onMounted(() => {
  setupIntersectionObservers()
})
</script>
