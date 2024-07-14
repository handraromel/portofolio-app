<template>
  <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-center space-x-2">
    <div class="flex justify-center space-x-2 max-sm:mb-2">
      <button
        @click="changePage(1)"
        :disabled="currentPage === 1 || loading"
        class="rounded-full p-2 text-sm font-medium transition-colors duration-200"
        :class="
          currentPage === 1 || loading
            ? 'bg-gray-200 text-gray-400'
            : 'bg-red-400 text-slate-200 hover:bg-red-500'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1 || loading"
        class="rounded-full p-2 text-sm font-medium transition-colors duration-200"
        :class="
          currentPage === 1 || loading
            ? 'bg-gray-200 text-gray-400'
            : 'bg-red-400 text-slate-200 hover:bg-red-500'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center space-x-1 max-sm:mb-2">
      <template v-for="page in displayedPages" :key="page">
        <button
          v-if="typeof page === 'number'"
          @click="changePage(page)"
          :class="[
            'rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200',
            currentPage === page
              ? 'bg-sky-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
          :disabled="loading"
        >
          {{ page }}
        </button>
        <span v-else class="px-2 text-gray-500">...</span>
      </template>
    </div>

    <div class="flex justify-center space-x-2 max-sm:w-full">
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages || totalPages < 2 || loading"
        class="rounded-full p-2 text-sm font-medium transition-colors duration-200"
        :class="
          currentPage === totalPages || totalPages < 2 || loading
            ? 'bg-gray-200 text-gray-400'
            : 'bg-red-400 text-slate-200 hover:bg-red-500'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button
        @click="changePage(totalPages)"
        :disabled="currentPage === totalPages || totalPages < 2 || loading"
        class="rounded-full p-2 text-sm font-medium transition-colors duration-200"
        :class="
          currentPage === totalPages || totalPages < 2 || loading
            ? 'bg-gray-200 text-gray-400'
            : 'bg-red-400 text-slate-200 hover:bg-red-500'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'change-page', page: number): void
}>()

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && !props.loading) {
    emit('change-page', newPage)
  }
}

const displayedPages = computed(() => {
  const totalDisplayed = 5
  const pages: (number | string)[] = []

  if (props.totalPages <= totalDisplayed) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  pages.push(1)

  if (props.currentPage > 3) {
    pages.push('...')
  }

  for (
    let i = Math.max(2, props.currentPage - 1);
    i <= Math.min(props.totalPages - 1, props.currentPage + 1);
    i++
  ) {
    pages.push(i)
  }

  if (props.currentPage < props.totalPages - 2) {
    pages.push('...')
  }

  pages.push(props.totalPages)

  return pages
})
</script>
