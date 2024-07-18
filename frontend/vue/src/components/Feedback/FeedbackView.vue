<template>
  <div class="flex min-h-[777px] flex-col justify-between">
    <div class="h-full space-y-3">
      <div class="flex w-full max-sm:flex-col sm:items-center sm:space-x-4">
        <Field
          type="text"
          :modelValue="searchTerm"
          @update:modelValue="debounceSearch"
          placeholder="Search users..."
        />
        <div class="relative flex w-[307px] flex-row space-x-2">
          <Field type="datepicker" v-model="startDate" placeholder="Start Date" />
          <Field type="datepicker" v-model="endDate" placeholder="End Date" />
          <span
            v-if="dateError"
            class="absolute -bottom-5 -left-2 -z-10 text-xs text-red-700 sm:-left-[7px] sm:-top-[12px]"
          >
            Start date must be before or equal to end date
          </span>
          <span
            v-else
            class="absolute -bottom-5 -left-2 -z-10 text-xs text-slate-700 sm:-left-[7px] sm:-top-[12px]"
          >
            Filter messages by date
          </span>
        </div>
      </div>
      <div
        v-for="(item, index) in displayItems"
        :key="index"
        class="h-[140px] overflow-hidden rounded border px-4 pb-4 pt-2 sm:h-[120px]"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-200 ease-in-out"
          leave-active-class="transition-all duration-200 ease-in-out"
          enter-from-class="opacity-0 transform translate-x-1"
          leave-to-class="opacity-0 transform translate-x-1"
        >
          <div v-if="loading" :key="`skeleton-${index}`" class="flex h-full max-sm:flex-wrap">
            <div class="flex w-full flex-col justify-between sm:w-7/12">
              <div>
                <div class="my-2 h-4 w-1/4 rounded bg-slate-200" />
                <div class="mb-1 h-4 w-full rounded bg-slate-200" />
                <div class="h-4 w-full rounded bg-slate-200" />
              </div>
              <div>
                <div class="h-4 w-28 rounded bg-slate-200" />
              </div>
            </div>
            <div class="flex w-full sm:w-5/12 sm:items-end sm:justify-end">
              <div class="h-4 w-52 rounded bg-slate-200" />
            </div>
          </div>
          <div v-else :key="`content-${index}`" class="flex h-full max-sm:flex-wrap">
            <div class="flex w-full flex-col justify-between sm:w-7/12">
              <div>
                <h3 class="font-bold">{{ item.subject }}</h3>
                <span class="mb-1 line-clamp-2" v-html="truncateMessage(item.message, 10)" />
              </div>

              <div>
                <Button
                  button-text="View Detail"
                  :uppercase="false"
                  type="submit"
                  bg-color="link"
                  @click="$emit('open-modal', 'feedbackDetail', item)"
                />
              </div>
            </div>
            <div class="flex w-full sm:w-5/12 sm:items-end sm:justify-end">
              <p class="text-sm">
                <span>Date created: </span>
                <span class="text-slate-500">{{ formatDate(item.createdAt) }}</span>
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div
      v-if="displayItems.length < 1 && !loading"
      class="flex flex-col items-center justify-center"
    >
      <p class="text-3xl font-bold">HMM...</p>
      <p class="mt-3 text-lg italic">Nothing to see here.</p>
    </div>

    <div class="mt-7">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :loading="loading"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useFeedbackStore } from '@/stores'
import { Pagination, Field } from '@/components'
import { type CurrentFeedbackData } from './types'
import { truncateMessage } from '@/utils/common'
import { MAX_PAGE_ITEM, DEFAULT_TIMEOUT_BUFFER } from '@/constant'

const props = defineProps<{
  feedbackData: CurrentFeedbackData[] | null
  currentPage: number
  totalPages: number
  loading: boolean
  searchTerm: string
  currentUserId: string
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
  (e: 'open-modal', modalName: string, data: CurrentFeedbackData): void
  (e: 'update-search', term: string): void
}>()

const feedbackStore = useFeedbackStore()

const loading = ref(props.loading)
const isFilteringOrSearching = ref(false)
const lastKnownItemCount = ref(0)
const currentFilters = ref<any>({})
const startDate = ref('')
const endDate = ref('')
const dateError = ref(false)

const displayItems = computed((): CurrentFeedbackData[] => {
  if (props.loading) {
    return Array(lastKnownItemCount.value).fill({})
  }
  return props.feedbackData || []
})

const applyFilterAndSearch = async (page: number = 1) => {
  if (isFilteringOrSearching.value) return
  isFilteringOrSearching.value = true

  currentFilters.value = {}

  if (startDate.value && endDate.value) {
    dateError.value = false
    currentFilters.value.dateRange = `${startDate.value},${endDate.value}`
    if (startDate.value > endDate.value) {
      dateError.value = true
      isFilteringOrSearching.value = false
      return
    }
  } else if (!startDate.value && !endDate.value) {
    dateError.value = false
    currentFilters.value = {}
  }

  await feedbackStore.getFeedbacks(
    props.currentUserId,
    page,
    MAX_PAGE_ITEM,
    props.searchTerm,
    currentFilters.value
  )

  isFilteringOrSearching.value = false
}

const debounceSearch = useDebounceFn((term: string) => {
  emit('update-search', term)
}, DEFAULT_TIMEOUT_BUFFER)

const changePage = (newPage: number) => {
  if (
    newPage >= 1 &&
    newPage <= props.totalPages &&
    !loading.value &&
    !isFilteringOrSearching.value
  ) {
    lastKnownItemCount.value = MAX_PAGE_ITEM
    emit('change-page', newPage)
    applyFilterAndSearch(newPage)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

watch([startDate, endDate], ([newStartDate, newEndDate], [oldStartDate, oldEndDate]) => {
  if (
    (newStartDate && newEndDate && (newStartDate !== oldStartDate || newEndDate !== oldEndDate)) ||
    (!newStartDate && !newEndDate && (oldStartDate || oldEndDate))
  ) {
    applyFilterAndSearch()
  }
})

watch(
  () => props.loading,
  (newValue) => {
    loading.value = newValue
  }
)

watch(
  () => props.feedbackData,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      lastKnownItemCount.value = newValue.length
    }
  }
)
</script>
