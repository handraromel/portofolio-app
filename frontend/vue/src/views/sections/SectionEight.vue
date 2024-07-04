<template>
  <div id="pricing" class="relative mb-48 mt-24 bg-white text-slate-500">
    <div class="container mx-auto px-4">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider text-gray-700">OUR PRICING</h2>
      <p class="mb-8 text-center text-lg text-gray-500">
        A 30 days free trial for all. A brief story about how this process works, keep an eye till
        the end.
      </p>
      <div class="mb-24 flex justify-center">
        <Decoration />
      </div>
      <div class="flex justify-center gap-8 max-sm:flex-wrap">
        <Price
          v-for="(plan, index) in plans"
          :key="index"
          :planName="plan.name"
          :price="plan.price"
          :features="plan.features"
          :isActive="effectiveActiveIndex === index"
          class="w-full cursor-pointer sm:w-72"
          @click="setActiveCard(index)"
          @button-click="setActiveCard(index)"
          @open-modal="openModal(plan)"
        />
      </div>
    </div>
  </div>

  <Modal
    :is-open="isModalOpen"
    @close="closeModal"
    :title="selectedContent?.name + ' PACK'"
    :show-close-icon="true"
  >
    <div v-if="selectedContent">
      <p class="mb-2 text-sm uppercase text-gray-500">
        Starts from <span class="font-bold">{{ selectedContent.price }}$</span>
      </p>
      <p class="font-semibold text-gray-700">Package included:</p>
      <ul
        class="ml-5 list-disc text-gray-700"
        v-for="(feature, index) in selectedContent.features"
        :key="index"
      >
        <li>{{ feature }}</li>
      </ul>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Decoration, Price, Modal } from '@/components'
import { type PriceContent } from '@/types'

const isModalOpen = ref(false)
const selectedContent = ref<PriceContent | null>(null)
const windowWidth = ref(window.innerWidth)

const openModal = (plan: PriceContent) => {
  selectedContent.value = plan
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const isMobile = computed(() => windowWidth.value < 640)

const activeIndex = ref(1)

const userInteracted = ref(false)

const effectiveActiveIndex = computed(() => {
  if (isMobile.value && !userInteracted.value) {
    return 0
  }
  return activeIndex.value
})

const setActiveCard = (index: number) => {
  activeIndex.value = index
  userInteracted.value = true
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (isMobile.value !== window.innerWidth < 640) {
    userInteracted.value = false
    activeIndex.value = isMobile.value ? 0 : 1
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  activeIndex.value = isMobile.value ? 0 : 1
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const plans: PriceContent[] = [
  {
    name: 'STARTER',
    price: 19,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  },
  {
    name: 'PREMIUM',
    price: 39,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  },
  {
    name: 'BUSINESS',
    price: 99,
    features: [
      'Competition Analysis Methods',
      'All Ranked URLs',
      'International Support System',
      'Social Media Tracking'
    ]
  }
]
</script>
