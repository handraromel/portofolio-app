<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-6">
      <div class="flex flex-row gap-6 max-md:flex-wrap">
        <div class="w-full md:w-1/2">
          <Field
            id="username"
            label="Username"
            name="username"
            type="text"
            v-model="formData.username"
            :error="v$.username.$errors[0]?.$message"
          />
        </div>

        <div class="w-full md:w-1/2">
          <Field
            id="email"
            label="Email"
            name="email"
            type="email"
            v-model="formData.email"
            :error="v$.email.$errors[0]?.$message"
          />
        </div>
      </div>
      <div class="flex flex-row gap-6 max-md:flex-wrap">
        <div class="w-full md:w-1/2">
          <Field
            id="first_name"
            label="First Name"
            name="first_name"
            type="text"
            v-model="formData.first_name"
          />
        </div>

        <div class="w-full md:w-1/2">
          <Field
            id="last_name"
            label="Last Name"
            name="last_name"
            type="text"
            v-model="formData.last_name"
          />
        </div>
      </div>

      <ToggleSwitch v-model="showPetName" label="Has Pet" />

      <Field
        v-if="showPetName"
        id="pet_name"
        label="Pet Name"
        name="pet_name"
        type="text"
        v-model="formData.pet_name"
        :error="v$.pet_name.$errors[0]?.$message"
      />

      <ToggleSwitch v-model="showLikedMusicGenre" label="Has Liked Music Genre" />

      <Dropdown
        v-if="showLikedMusicGenre"
        id="liked_music_genre"
        label="Liked Music Genre"
        v-model="formData.liked_music_genre"
        :options="musicGenres"
        placeholder="Select a music genre"
        :error="v$.liked_music_genre.$errors[0]?.$message"
      />

      <ToggleSwitch v-model="showMostLikedPlace" label="Has Most Liked Place" />

      <Dropdown
        v-if="showMostLikedPlace"
        id="most_liked_place"
        label="Most Liked Place"
        v-model="formData.most_liked_place"
        :options="places"
        placeholder="Select a place"
        :error="v$.most_liked_place.$errors[0]?.$message"
      />

      <Field
        v-if="formData.most_liked_place === 'Outside'"
        id="other_place"
        label="Other Place"
        name="other_place"
        type="text"
        v-model="formData.other_place"
        :error="v$.other_place.$errors[0]?.$message"
      />

      <Slider
        v-model="formData.feel_score"
        id="feel_score"
        label="Feel Score"
        :colorize-bg="true"
        :display-value="true"
      />

      <div class="mt-10 flex w-full justify-end gap-4 pr-0.5">
        <Button button-text="cancel" bg-color="secondary" type="button" @click="$emit('close')" />
        <Button
          button-text="update"
          type="submit"
          :disabled="v$.$invalid"
          :bg-color="v$.$invalid ? 'disabled' : 'primary'"
          :loading-state="isLoading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Field, ToggleSwitch, Dropdown, Slider, Button } from '@/components'
import { useVuelidate } from '@vuelidate/core'
import { useFormValidation } from '@/composables'
import { storeToRefs } from 'pinia'
import { useUserStore, useAuthStore } from '@/stores'
import { useToast } from 'vue-toastification'
import type { CurrentUserData } from '@/types'

const userStore = useUserStore()
const { user, userMessage } = storeToRefs(userStore)
const { editProfileSchema } = useFormValidation()
const toast = useToast()

const authUserAction = useAuthStore()
const currentUserId = authUserAction.getUserId

const isLoading = ref(false)
const showPetName = ref(false)
const showLikedMusicGenre = ref(false)
const showMostLikedPlace = ref(false)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formData = ref<CurrentUserData>({
  username: '',
  email: '',
  first_name: null,
  last_name: null,
  pet_name: null,
  liked_music_genre: null,
  most_liked_place: null,
  other_place: '',
  feel_score: 0
})

const rules = editProfileSchema(
  computed(() => formData.value),
  computed(() => showPetName.value),
  computed(() => showLikedMusicGenre.value),
  computed(() => showMostLikedPlace.value)
)

const v$ = useVuelidate<CurrentUserData>(rules, formData, { $autoDirty: true })

const musicGenres = [
  'Just Normal Metal',
  'Death Metal With Clean Vocal',
  'Accoustic Death Metal With Growling',
  'Mathematical Metal (Need to write it down to understand the song)',
  'No Metal, Just Unicorn',
  'Metal With Spit Fire',
  'Gloomy Metal',
  'Metal While Hugging Your Adorable Cat',
  'Cannibal Corpse'
]

const places = [
  'Kitchen',
  'Living Room',
  'Your Room',
  'Balcony',
  'Backyard',
  'Terrace',
  'Shower',
  'Outside'
]

watch(
  [showPetName, showLikedMusicGenre, showMostLikedPlace],
  ([newShowPetName, newShowLikedMusicGenre, newShowMostLikedPlace]) => {
    if (!newShowPetName) {
      formData.value.pet_name = null
    }
    if (!newShowLikedMusicGenre) {
      formData.value.liked_music_genre = null
    }
    if (!newShowMostLikedPlace) {
      formData.value.most_liked_place = null
      formData.value.other_place = ''
    }
  }
)

onMounted(async () => {
  if (user.value) {
    Object.assign(formData.value, user.value)

    showPetName.value = !!formData.value.pet_name
    showLikedMusicGenre.value = !!formData.value.liked_music_genre
    showMostLikedPlace.value = !!formData.value.most_liked_place
  } else {
    await userStore.currentUser(currentUserId)
    if (user.value) {
      Object.assign(formData.value, user.value)

      showPetName.value = !!formData.value.pet_name
      showLikedMusicGenre.value = !!formData.value.liked_music_genre
      showMostLikedPlace.value = !!formData.value.most_liked_place
    }
  }
})

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  isLoading.value = true

  try {
    const payload = { ...formData.value }
    if (payload.most_liked_place === 'Outside') {
      payload.most_liked_place = payload.other_place as string
    }
    delete payload.other_place

    const success = await userStore.updateUser(currentUserId, payload as CurrentUserData)
    if (success) {
      toast.success(userMessage.value)
      emit('close')
    } else {
      toast.error(userMessage.value)
      emit('close')
    }
    emit('close')
  } catch (error) {
    toast.error('Failed to update profile')
    console.error('Update profile error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
