<template>
  <div v-if="feedback">
    <h3 class="mb-4 text-xl font-bold">{{ feedback.subject }}</h3>
    <span class="mb-4" v-html="feedback.message" />
    <p class="mt-5 text-right text-sm text-gray-500">
      Date created: {{ formatDate(feedback.createdAt) }}
    </p>
  </div>
  <div v-else class="text-center text-gray-500">No feedback data available.</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { type CurrentFeedbackData } from '@/types'

defineProps<{
  feedback: CurrentFeedbackData | null
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
