<template>
  <div
    id="home"
    class="flex h-screen items-center justify-center bg-slate-500 bg-cover bg-center text-white"
    :style="{ backgroundImage: `url(${publicAssets[0].section1[0].background})` }"
  >
    <div class="container mx-auto px-4 text-center max-sm:mt-10">
      <div class="flex flex-col gap-9 max-sm:gap-6">
        <div
          id="header-title"
          class="mx-1 text-2xl font-semibold tracking-widest md:text-4xl xl:text-5xl"
          v-scroll-utilities="{
            type: 'animation',
            animationType: 'fadeIn',
            duration: 1.2,
            delay: 0.5
          }"
        >
          WELCOME TO MY PORTOFOLIO WEBSITE
        </div>
        <div
          v-if="isAuthenticated"
          id="display-username"
          v-scroll-utilities="{
            type: 'animation',
            animationType: 'fadeIn',
            duration: 1.5,
            delay: 1
          }"
        >
          <p class="text-2xl uppercase tracking-wider text-red-500 sm:text-5xl">
            {{ displayName }}
          </p>
        </div>
        <div id="header-separator" class="flex justify-center">
          <Decoration />
        </div>
        <div
          id="header-desc"
          class="lg:mx-45 mx-2 pb-14 text-lg max-sm:pb-4 xl:mx-[17rem]"
          v-scroll-utilities="{
            type: 'animation',
            animationType: 'fadeIn',
            duration: 2,
            delay: 1.5
          }"
        >
          <p class="max-sm:text-md leading-9 max-sm:leading-7">
            Welcome to my web development portfolio! This site features Vue.js, Tailwind CSS,
            Headless UI, and a RESTful API with Express.js, Sequelize, and MySQL. Register and log
            in via the user icon to update your profile and change your password. Feel free to
            explore and leave a message
            <a href="#contact" v-smooth-scroll class="font-bold text-red-500 underline">here</a>.
            Enjoy!
          </p>
        </div>
        <div id="buttons" class="flex justify-center">
          <div class="flex flex-wrap justify-center gap-8">
            <div>
              <Button
                button-text="get started now"
                :fixed-width="true"
                @click="openModal('signIn')"
              />
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
    <div class="absolute bottom-[-0.1%]">
      <a href="#advantage" v-smooth-scroll>
        <CircledIcon :icon-src="`${publicAssets[0].section1[0].anchor}`" :is-button="true" />
      </a>
    </div>
  </div>

  <Modal
    v-for="(modal, index) in modals"
    :key="index"
    :is-open="modal.isOpen"
    :title="modal.title"
    :show-close-icon="modalsWithCloseIcon.includes(modal.name)"
    @close="closeModal(modal.name)"
  >
    <div v-if="isAuthenticated" class="text-center">
      <div class="-mt-5 mb-5 flex w-full justify-center">
        <img class="h-20 w-20" :src="`${publicAssets[0].stats[0].info}`" alt="info" />
      </div>
      <p class="text-sky-600">You're Currently Signed In, Please Enjoy.</p>
    </div>
    <component
      v-else
      :is="modal.component"
      @close="closeModal(modal.name)"
      @openModal="handleChildModalOpenEvent"
    />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, CircledIcon, Decoration } from '@/components'
import { Modal, SignIn, ForgotPassword } from '@/components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useSmoothScroll } from '@/composables'
import { publicAssets } from '@/constant'

defineProps<{
  isAuthenticated: boolean
}>()

const { getAdminCheck, getUsername } = storeToRefs(useAuthStore())

const displayName = computed(() => {
  if (getAdminCheck.value) {
    return 'administrator'
  }
  return getUsername.value
})

type ModalName = 'signIn' | 'forgotPassword'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const modalStates = ref({
  signIn: false,
  forgotPassword: false
})

const modals = computed(() => [
  {
    name: 'signIn' as const,
    isOpen: modalStates.value.signIn,
    title: 'Sign In To Your Account',
    component: SignIn
  },
  {
    name: 'forgotPassword' as const,
    isOpen: modalStates.value.forgotPassword,
    title: 'Forgot Password',
    component: ForgotPassword
  }
])

const modalsWithCloseIcon = ['info', 'displayData']

const openModal = (modalName: ModalName) => {
  modalStates.value[modalName] = true
}

const closeModal = (modalName: ModalName) => {
  modalStates.value[modalName] = false
  if (modalName === 'forgotPassword') openModal('signIn')
}

const handleChildModalOpen = (modalName: ModalName) => {
  if (modalName === 'forgotPassword') closeModal('signIn')
  openModal(modalName)
}

const handleChildModalOpenEvent = handleChildModalOpen as (...args: unknown[]) => void

const { scrollToElement } = useSmoothScroll()

const scrollToAdvantage = () => {
  scrollToElement('advantage', '#advantage')
}
</script>
