<!-- Modal.vue -->
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="handleClose" class="relative z-[200]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-950/70" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="[
                'relative w-full transform overflow-auto rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all',
                sizeClass
              ]"
            >
              <button
                v-if="showCloseIcon"
                @click="closeModal"
                class="absolute right-2 top-2 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <DialogTitle
                v-if="title"
                as="h2"
                class="mb-10 text-center text-2xl font-semibold leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { useComponentStore } from '@/stores'
import { type ModalProps } from '@/types'

const componentStore = useComponentStore()

const props = withDefaults(defineProps<ModalProps>(), {
  showCloseIcon: false,
  persistModal: false
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'lg':
      return 'max-w-lg'
    case 'xl':
      return 'max-w-xl'
    case '2xl':
      return 'max-w-2xl'
    case '3xl':
      return 'max-w-3xl'
    case '4xl':
      return 'max-w-4xl'
    case '5xl':
      return 'max-w-5xl'
    case '6xl':
      return 'max-w-6xl'
    case '7xl':
      return 'max-w-7xl'
    case 'full':
      return 'max-w-full'
    default:
      return 'max-w-md'
  }
})

const handleClose = () => {
  if (!props.persistModal) {
    closeModal()
  }
}

const closeModal = () => {
  emit('close')
  componentStore.setModalState(false)
}

watch(
  () => props.isOpen,
  (newValue) => {
    componentStore.setModalState(newValue)
  }
)
</script>
