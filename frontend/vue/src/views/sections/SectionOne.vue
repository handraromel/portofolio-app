<template>
  <div
    id="home"
    class="flex h-screen items-center justify-center bg-[url('/assets/section_1/background.jpg')] bg-cover bg-center text-white"
  >
    <div class="container mx-auto px-4 text-center max-sm:mb-10">
      <div class="flex flex-col gap-9 max-sm:gap-6">
        <div id="header-subtitle" class="mx-5 text-xl lg:text-3xl">
          <p>Our Clients Are Our First Priority</p>
        </div>
        <div id="header-title" class="mx-5 text-5xl font-semibold tracking-widest xl:text-7xl">
          WELCOME TO SOME WEB
        </div>
        <div v-if="isAuthenticated" id="display-username">
          <p class="text-3xl uppercase tracking-wider text-red-500 lg:text-5xl">
            {{ displayName }}
          </p>
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
              <Button button-text="get started now" :fixed-width="true" @click="openSignInModal" />
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

  <Modal
    :is-open="isSignInModalOpen"
    @close="closeSignInModal"
    :title="isAuthenticated ? '' : 'Sign In to Your Account'"
  >
    <div v-if="isAuthenticated" class="text-center">
      <div class="-mt-5 mb-5 flex w-full justify-center">
        <img class="h-20 w-20" src="/assets/stats/info.svg" alt="info" />
      </div>
      <p class="text-sky-600">You're Currently Signed In, Please Enjoy.</p>
    </div>
    <SignIn v-else @success="closeSignInModal" @cancel="closeSignInModal" />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, CircledIcon, Decoration } from '@/components'
import { Modal, SignIn } from '@/components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useSmoothScroll } from '@/composables'

defineProps<{
  isAuthenticated: boolean
}>()

const { getAdminCheck, getUsername } = storeToRefs(useAuthStore())

const isSignInModalOpen = ref(false)

const displayName = computed(() => {
  if (getAdminCheck.value) {
    return 'administrator'
  }
  return getUsername.value
})

const openSignInModal = () => {
  isSignInModalOpen.value = true
}

const closeSignInModal = () => {
  isSignInModalOpen.value = false
}

const { scrollToElement } = useSmoothScroll()

const scrollToAdvantage = () => {
  scrollToElement('advantage', '#advantage')
}
</script>
