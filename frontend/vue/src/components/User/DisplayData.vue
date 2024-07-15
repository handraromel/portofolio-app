<template>
  <div v-if="user" class="mx-auto max-w-2xl">
    <div class="flex flex-col space-y-4">
      <div class="flex flex-col rounded-md bg-blue-50 p-4">
        <h3 class="mb-2 text-lg font-semibold text-blue-800">Basic Information</h3>
        <div class="flex flex-col space-y-2">
          <p class="text-sm">
            <span class="font-medium">Username:</span> <span>{{ user.username }}</span>
            <span v-if="authStore.getAdminCheck">
              || <b class="font-bold text-emerald-600">Administrator</b>
            </span>
          </p>
          <p class="text-sm"><span class="font-medium">Email:</span> {{ user.email }}</p>
          <p class="text-sm">
            <span class="font-medium">Name:</span>
            {{ [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Not provided' }}
          </p>
        </div>
      </div>

      <div class="-mx-2 flex flex-wrap">
        <div class="mb-4 w-full px-2 sm:w-1/2">
          <div
            :class="[
              'flex h-full flex-col rounded-md p-4',
              user.pet_name ? 'bg-green-50' : 'bg-gray-200'
            ]"
          >
            <h3 class="mb-2 text-lg font-semibold text-green-800">Pet Information</h3>
            <p class="text-sm">
              <span class="font-medium">Has Pet:</span> {{ user.pet_name ? 'Yes' : 'No' }}
            </p>
            <p v-if="user.pet_name" class="text-sm">
              <span class="font-medium">Pet Name:</span> {{ user.pet_name || 'Not provided' }}
            </p>
          </div>
        </div>
        <div class="mb-4 w-full px-2 sm:w-1/2">
          <div
            :class="[
              'flex h-full flex-col rounded-md p-4',
              user.liked_music_genre ? 'bg-purple-50' : 'bg-gray-200'
            ]"
          >
            <h3 class="mb-2 text-lg font-semibold text-purple-800">Music Preference</h3>
            <p class="text-sm">
              <span class="font-medium">Has Liked Genre:</span>
              {{ user.liked_music_genre ? 'Yes' : 'No' }}
            </p>
            <p v-if="user.liked_music_genre" class="text-sm">
              <span class="font-medium">Favorite Genre:</span>
              {{ user.liked_music_genre || 'Not specified' }}
            </p>
          </div>
        </div>
      </div>

      <div class="-mx-2 flex flex-wrap">
        <div class="mb-4 w-full px-2 sm:w-1/2">
          <div
            :class="[
              'flex h-full flex-col rounded-md p-4',
              user.most_liked_place ? 'bg-yellow-50' : 'bg-gray-200'
            ]"
          >
            <h3 class="mb-2 text-lg font-semibold text-yellow-800">Place Preference</h3>
            <p class="text-sm">
              <span class="font-medium">Has Favorite Place:</span>
              {{ user.most_liked_place ? 'Yes' : 'No' }}
            </p>
            <p v-if="user.most_liked_place" class="text-sm">
              <span class="font-medium">Favorite Place:</span>
              {{ user.most_liked_place || 'Not specified' }}
            </p>
          </div>
        </div>
        <div class="mb-4 w-full px-2 sm:w-1/2">
          <div :class="['flex h-full flex-col rounded-md p-4', feelScoreData.bgColor]">
            <h3 class="mb-2 text-lg font-semibold text-pink-800">Feel Score</h3>
            <p class="text-sm">
              <span class="font-medium">Current Score: </span>
              <span class="font-medium">{{ user.feel_score ?? '' }}</span> <br />
              {{ feelScoreData.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-center gap-5 max-sm:flex-col sm:justify-end">
      <div>
        <Button
          button-text="Update Password"
          @click="openModal('updatePassword')"
          bg-color="info"
          text-size="sm"
        />
      </div>
      <div>
        <Button
          button-text="Edit Profile"
          @click="openModal('editProfile')"
          bg-color="info"
          text-size="sm"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-600">Loading user data...</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { Button } from '@/components'
import { storeToRefs } from 'pinia'
import { useUserStore, useAuthStore } from '@/stores'

const emit = defineEmits<{
  (e: 'openModal', modalName: string): void
}>()

const authStore = useAuthStore()
const currentUserId = authStore.getUserId

const { user } = storeToRefs(useUserStore())

const userStore = useUserStore()

const openModal = (modalName: string) => {
  emit('openModal', modalName)
}

const feelScoreData = computed(() => {
  const score = user.value?.feel_score

  if (score === null || score === undefined) {
    return { bgColor: 'bg-gray-200', text: 'Not set' }
  }
  if (score <= 33) {
    return { bgColor: 'bg-red-500', text: 'Like a coiled cable' }
  }
  if (score <= 66) {
    return { bgColor: 'bg-yellow-500', text: "I'd just play video game all day" }
  }
  return { bgColor: 'bg-green-500', text: "Let's socialize!" }
})

onMounted(async () => await userStore.currentUser(currentUserId))
</script>
