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
                v-model="formData[field.model]"
                :placeholder="field.placeholder"
                :name="field.model"
                :label="field.label"
                :rows="field.rows"
                :error="v$[field.model].$errors[0]?.$message as string"
              />
            </div>
            <div v-if="isAuthenticated" class="mb-4 flex items-end justify-end">
              <Button
                button-text="View submitted messages"
                type="button"
                bg-color="link"
                :uppercase="false"
                text-size="sm"
                @click="openModal('feedbackList')"
              />
            </div>
            <div class="flex w-full justify-end pl-0.5">
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
  <Modal
    v-for="modal in modals"
    :key="modal.name"
    :is-open="modal.isOpen"
    :title="modal.title"
    :show-close-icon="modal.showCloseIcon"
    :size="modal.size"
    @close="closeModal(modal.name)"
  >
    <component
      :is="modal.component"
      v-bind="modal.props"
      @close="closeModal(modal.name)"
      @open-modal="handleOpenModalEvent"
      @change-page="handlePageChangeEvent"
      @update-search="handleSearchEvent"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTimeoutFn, useDebounceFn } from '@vueuse/core'
import useVuelidate from '@vuelidate/core'
import { Decoration, Button, Field, Modal, FeedbackView, FeedbackDetail } from '@/components'
import {
  type FeedbackFormData,
  type FeedbackPayload,
  type CurrentFeedbackData
} from '@/components/Feedback/types'
import { DEFAULT_TIMEOUT_BUFFER, FIVES_TIMEOUT_BUFFER } from '@/constant'
import { storeToRefs } from 'pinia'
import { useAuthStore, useFeedbackStore } from '@/stores'
import { useFormValidation } from '@/composables'

type ModalName = 'feedbackList' | 'feedbackDetail'

const authStore = useAuthStore()
const feedbackStore = useFeedbackStore()
const { userMessage: authMessage, isAuthenticated } = storeToRefs(authStore)
const {
  userMessage: feedbackMessage,
  feedbacks,
  currentPage,
  totalPages
} = storeToRefs(feedbackStore)
const { submitFeedbackSchema } = useFormValidation()

const isLoading = ref(false)
const isFeedbacksFetching = ref(false)
const isError = ref(false)
const userMessage = ref('')
const showMessage = ref(false)
const selectedFeedback = ref<CurrentFeedbackData | null>(null)

const formData = ref<FeedbackFormData>({
  subject: '',
  message: ''
})

const modalStates = ref({
  feedbackList: false,
  feedbackDetail: false
})

const fields = [
  { model: 'subject', type: 'text', placeholder: 'Subject', rows: 0, label: '' },
  { model: 'message', type: 'textarea', placeholder: 'Message', rows: 7, label: 'Your Message' }
] as const

const v$ = useVuelidate(submitFeedbackSchema, formData, { $autoDirty: true })

const PAGINATION_DISPLAY_LIMIT = 5

const { start: startMessageTimeout, stop: stopMessageTimeout } = useTimeoutFn(
  () => {
    showMessage.value = false
  },
  FIVES_TIMEOUT_BUFFER,
  { immediate: false }
)

const displayMessage = (newMessage: string, error: boolean) => {
  userMessage.value = newMessage
  isError.value = error
  showMessage.value = true
  stopMessageTimeout()
  startMessageTimeout()
}

const currentUserId = computed(() => {
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
      currentUserId.value,
      formData.value as FeedbackPayload
    )
    displayMessage(feedbackMessage.value, !success)
  } catch (err) {
    displayMessage((err as Error).message || feedbackMessage.value, true)
  } finally {
    isLoading.value = false
    formData.value = {
      subject: '',
      message: ''
    }
    v$.value.$reset()
  }
}

const fetchFeedbacks = async (
  pageNumber: number = 1,
  search: string = feedbackStore.searchTerm
) => {
  if (isFeedbacksFetching.value) return
  isFeedbacksFetching.value = true
  try {
    await feedbackStore.getFeedbacks(
      currentUserId.value,
      pageNumber,
      PAGINATION_DISPLAY_LIMIT,
      search
    )
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    displayMessage(feedbackMessage.value, true)
  } finally {
    isFeedbacksFetching.value = false
  }
}

const handlePageChange = (pageNumber: number) => {
  fetchFeedbacks(pageNumber, feedbackStore.searchTerm)
}

const handleSearch = useDebounceFn((searchTerm: string) => {
  if (searchTerm !== feedbackStore.searchTerm) {
    feedbackStore.setSearchTerm(searchTerm)
    fetchFeedbacks(1, searchTerm) // Reset to first page when searching
  }
}, DEFAULT_TIMEOUT_BUFFER)

const openModal = (modalName: ModalName, data?: CurrentFeedbackData) => {
  if (modalName === 'feedbackDetail' && data) {
    selectedFeedback.value = data
    modalStates.value.feedbackList = false
    modalStates.value.feedbackDetail = true
  } else if (modalName === 'feedbackList') {
    modalStates.value.feedbackDetail = false
    modalStates.value.feedbackList = true
    fetchFeedbacks()
  }
}

const closeModal = (modalName: ModalName) => {
  modalStates.value[modalName] = false
  if (modalName === 'feedbackDetail') {
    modalStates.value.feedbackList = true
  }
}

const handleOpenModalEvent = openModal as (...args: unknown[]) => void
const handlePageChangeEvent = handlePageChange as (...args: unknown[]) => void
const handleSearchEvent = handleSearch as (...args: unknown[]) => void

const modals = computed(() => [
  {
    name: 'feedbackList' as const,
    isOpen: modalStates.value.feedbackList,
    title: 'Your Submitted Messages',
    component: FeedbackView,
    showCloseIcon: true,
    size: '3xl',
    props: {
      feedbackData: feedbacks.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      loading: isFeedbacksFetching.value,
      currentUserId: currentUserId.value,
      searchTerm: feedbackStore.searchTerm
    }
  },
  {
    name: 'feedbackDetail' as const,
    isOpen: modalStates.value.feedbackDetail,
    title: 'Feedback Detail',
    component: FeedbackDetail,
    showCloseIcon: true,
    size: 'xl',
    props: {
      feedback: selectedFeedback.value
    }
  }
])
watch(isAuthenticated, async (newValue) => {
  if (!newValue) {
    displayMessage(authMessage.value, true)
    feedbacks.value = null
  }
})
</script>
