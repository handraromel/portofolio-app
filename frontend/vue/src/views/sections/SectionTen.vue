<template>
  <div id="contact" class="my-24 bg-white text-slate-500">
    <div class="container mx-auto px-4">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider text-gray-800">
        KEEP IN TOUCH
        <br />
      </h2>
      <p class="mb-8 text-center text-lg text-gray-600">
        Nullam sit amet odio eu est aliquet euismod a a urna. Proin eu urna suscipit, dictum quam
        nec.
      </p>
      <div class="mb-20 flex justify-center">
        <Decoration />
      </div>

      <div class="flex flex-col items-center justify-center gap-10">
        <div class="w-full bg-white p-8 drop-shadow-lg md:w-9/12 lg:w-5/12">
          <transition
            enter-active-class="transition duration-300 ease-in-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-300 ease-in-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="showMessage"
              :class="['mb-5 w-full rounded-md py-1', isError ? 'bg-red-700' : 'bg-emerald-500']"
            >
              <span class="px-2 text-white">{{ userMessage }}</span>
            </div>
          </transition>
          <form @submit.prevent="handleSubmit">
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
              <Field
                :type="field.type"
                :placeholder="field.placeholder"
                v-model="formData[field.model]"
                :name="field.model"
                :error="v$[field.model].$errors[0]?.$message as string"
              />
            </div>
            <div class="w-full pl-0.5">
              <Button
                button-text="send message"
                type="submit"
                :bg-color="v$.$invalid ? 'disabled' : 'primary'"
                :disabled="v$.$invalid"
                :loading-state="isLoading"
              />
            </div>
          </form>
        </div>

        <div class="w-full bg-white p-8 drop-shadow-lg md:w-9/12 lg:w-5/12">
          <h3 class="mb-4 text-xl font-bold text-red-500">OUR ADDRESS</h3>
          <p class="mb-6">House #13, Streat road, Sydney 2310 Australia</p>

          <h3 class="mb-4 text-xl font-bold text-red-500">CALL US</h3>
          <p class="mb-2">+ 880 168 109 1425</p>
          <p class="mb-6">+ 0216809142</p>

          <h3 class="mb-4 text-xl font-bold text-red-500">EMAIL US</h3>
          <p>contactus@email.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import useVuelidate from '@vuelidate/core'
import { Decoration, Button, Field } from '@/components'
import { type CurrentFeedbackData, type FeedbackPayload } from '@/types'
import { storeToRefs } from 'pinia'
import { useAuthStore, useFeedbackStore } from '@/stores'
import { useFormValidation } from '@/composables'

const authStore = useAuthStore()
const feedbackStore = useFeedbackStore()
const { userMessage: authMessage, isAuthenticated } = storeToRefs(authStore)
const { userMessage: feedbackMessage } = storeToRefs(feedbackStore)
const { submitFeedbackSchema } = useFormValidation()

const isLoading = ref(false)
const isError = ref(false)
const formData = ref<CurrentFeedbackData>({
  subject: '',
  message: ''
})

const fields = [
  { model: 'subject', type: 'text', placeholder: 'Subject' },
  { model: 'message', type: 'textarea', placeholder: 'Message' }
] as const

const v$ = useVuelidate(submitFeedbackSchema, formData, { $autoDirty: true })

const userMessage = ref('')
const showMessage = ref(false)

const { start: startMessageTimeout, stop: stopMessageTimeout } = useTimeoutFn(
  () => {
    showMessage.value = false
  },
  5000,
  { immediate: false }
)

const displayMessage = (newMessage: string, error: boolean) => {
  userMessage.value = newMessage
  isError.value = error
  showMessage.value = true
  stopMessageTimeout()
  startMessageTimeout()
}

const effectiveUserId = computed(() => {
  const userId = authStore.getUserId
  return userId || Math.floor(Math.random() * 1000000).toString()
})

const handleSubmit = async () => {
  if (!isAuthenticated.value) {
    displayMessage(authMessage.value, true)
  }

  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isLoading.value = true
  try {
    const success = await feedbackStore.submitFeedback(
      effectiveUserId.value,
      formData.value as FeedbackPayload
    )
    displayMessage(feedbackMessage.value, !success)
  } catch (err) {
    displayMessage((err as Error).message || feedbackMessage.value, true)
  } finally {
    isLoading.value = false
  }
}

watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    displayMessage(authMessage.value, true)
  }
})
</script>
