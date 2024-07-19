<template>
  <nav
    :class="[
      'fixed z-[100] w-full transition-all duration-300 ease-in-out',
      scrolled || mobileMenuOpen ? 'max-h-full bg-gray-800 pt-0' : 'max-h-0 bg-transparent pt-5',
      isHidden && !isHovered ? '-translate-y-full' : 'translate-y-0'
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="logo flex w-3/12 pt-5 lg:w-1/12 lg:justify-start">
          <img class="h-20 w-20 object-contain" src="/favicon.svg" alt="Navbar Logo" />
        </div>

        <div
          class="hidden lg:flex lg:w-10/12 lg:flex-wrap lg:justify-end lg:gap-x-8 lg:gap-y-4 xl:gap-x-3 xl:gap-y-8"
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

        <div class="flex w-8/12 justify-end pr-5 lg:hidden">
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

        <div class="flex flex-col items-end justify-end lg:w-1/12">
          <UserMenu
            v-model:open="userMenuOpen"
            :force-close="isHidden || isScrolling"
            @modal-state-change="updateModalState"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      :class="[
        'overflow-hidden transition-all duration-300 ease-in-out lg:hidden',
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
import { ref, watch, onMounted } from 'vue'
import { UserMenu } from '@/components'
import { menuItems } from '@/constant'
import { useNavbarBehavior } from '@/composables/useNavbarBehavior'
import { hyphenize } from '@/utils/common'
import { useWindowScroll } from '@vueuse/core'

const userMenuOpen = ref(false)
const isModalOpen = ref(false)
const isScrolling = ref(false)

const {
  scrolled,
  mobileMenuOpen,
  isHidden,
  isHovered,
  activeItem,
  updateHashAndActiveItem,
  toggleMobileMenu,
  handleMouseEnter,
  handleMouseLeave,
  resetNavbarBehavior
} = useNavbarBehavior(isModalOpen)

const { y } = useWindowScroll()

let scrollTimeout: number | null = null
watch(y, () => {
  isScrolling.value = true
  userMenuOpen.value = false

  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  scrollTimeout = setTimeout(() => {
    isScrolling.value = false
  }, 150) as unknown as number
})

const updateModalState = (isOpen: boolean) => {
  isModalOpen.value = isOpen
  if (!isOpen) {
    resetNavbarBehavior()
  }
}
</script>
