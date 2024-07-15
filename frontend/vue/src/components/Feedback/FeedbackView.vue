<template>
  <div class="flex min-h-[720px] flex-col justify-between">
    <div class="h-full space-y-3">
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
      <p class="text-3xl font-bold">OOPS...</p>
      <p class="mt-3 text-lg italic">Seems you don't have any messages yet</p>
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
import { type CurrentFeedbackData } from '@/types'
import { Pagination, Button } from '@/components'
import { truncateMessage } from '@/utils/common'

const props = defineProps<{
  feedbackData: CurrentFeedbackData[] | null
  currentPage: number
  totalPages: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
  (e: 'open-modal', modalName: string, data: CurrentFeedbackData): void
}>()

const MAX_PAGE_ITEM = 5

const loading = ref(props.loading)
const lastKnownItemCount = ref(0)

const displayItems = computed((): CurrentFeedbackData[] => {
  if (props.loading) {
    return Array(lastKnownItemCount.value).fill({})
  }
  return props.feedbackData || []
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

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && !loading.value) {
    lastKnownItemCount.value = MAX_PAGE_ITEM
    emit('change-page', newPage)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
