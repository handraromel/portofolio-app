<template>
  <Teleport to="body">
    <Modal
      :is-open="isVerificationModalOpen"
      @close="closeVerificationModal"
      title="Email Verification"
      :persist-modal="true"
    >
      <div class="text-center">
        <div v-if="isLoading">
          <div class="-mt-5 mb-5 flex w-full justify-center">
            <div class="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-sky-500" />
          </div>
          <p class="font-semibold text-sky-500">Verifying your email</p>
          <p class="text-sm font-normal text-slate-500">Please wait...</p>
        </div>
        <div v-else-if="isVerified">
          <div class="-mt-5 mb-5 flex w-full justify-center">
            <img class="h-20 w-20" src="/assets/stats/success.svg" alt="success" />
          </div>
          <p class="font-semibold text-green-600">{{ message }}</p>
          <p class="text-sm text-sky-500">Sign in now to access your account.</p>
        </div>
        <div v-else>
          <div class="-mt-5 mb-5 flex w-full justify-center">
            <img class="h-20 w-20" src="/assets/stats/error.svg" alt="error" />
          </div>
          <p class="font-semibold text-red-600">{{ error }}</p>
          <p class="text-sm font-normal text-slate-500">
            URL is invalid or possible error from server
          </p>
        </div>
        <div v-if="!isLoading" class="mt-4 flex flex-col items-center">
          <div class="relative">
            <div
              class="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-sky-500"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-bold text-sky-500">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import { useTimeoutFn, useCounter } from '@vueuse/core'
import { useRouteParams } from '@vueuse/router'
import { Modal } from '@/components'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isVerificationModalOpen = ref(false)
const isVerified = ref(false)
const isLoading = ref(false)
const message = ref('')
const error = ref('')

const token = useRouteParams('token')
const CLOSE_DELAY = 5

const { count, reset } = useCounter(CLOSE_DELAY, { min: 0, max: CLOSE_DELAY })

const singleToken = computed(() => {
  if (Array.isArray(token.value)) {
    return token.value[0] || ''
  }
  return token.value || ''
})

const closeVerificationModal = () => {
  isVerificationModalOpen.value = false
  router.push('/vue-express-portofolio')
}

const { start: startCloseTimeout } = useTimeoutFn(() => {
  closeVerificationModal()
}, CLOSE_DELAY * 1000)

const verifyEmail = async () => {
  if (!singleToken.value) {
    error.value = 'No verification token provided'
    return
  }

  isLoading.value = true
  try {
    const result = await authStore.verifyEmail(singleToken.value)
    isVerified.value = true
    message.value = result.msg
    reset(CLOSE_DELAY)
    startCloseTimeout()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred during verification'
    reset(CLOSE_DELAY)
    startCloseTimeout()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.name === 'verifyEmail') {
    isVerificationModalOpen.value = true
    verifyEmail()
  }

  const countdownInterval = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      clearInterval(countdownInterval)
    }
  }, 1000)
})
</script>
