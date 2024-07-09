<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-6">
      <Field
        id="username"
        label="Username"
        type="text"
        v-model="formData.username"
        :error="v$.username.$errors[0]?.$message"
      />

      <Field
        id="email"
        label="Email"
        type="email"
        v-model="formData.email"
        :error="v$.email.$errors[0]?.$message"
      />

      <Field id="first_name" label="First Name" type="text" v-model="formData.first_name" />

      <Field id="last_name" label="Last Name" type="text" v-model="formData.last_name" />

      <ToggleSwitch v-model="formData.has_pet" label="Has Pet" />

      <Field
        v-if="formData.has_pet"
        id="pet_name"
        label="Pet Name"
        type="text"
        v-model="formData.pet_name"
        :error="v$.pet_name.$errors[0]?.$message"
      />

      <ToggleSwitch v-model="formData.has_liked_music_genre" label="Has Liked Music Genre" />

      <Dropdown
        v-if="formData.has_liked_music_genre"
        id="liked_music_genre"
        label="Liked Music Genre"
        v-model="formData.liked_music_genre"
        :options="musicGenres"
        placeholder="Select a music genre"
        :error="v$.liked_music_genre.$errors[0]?.$message"
      />

      <ToggleSwitch v-model="formData.has_most_liked_place" label="Has Most Liked Place" />

      <Dropdown
        v-if="formData.has_most_liked_place"
        id="most_liked_place"
        label="Most Liked Place"
        v-model="formData.most_liked_place"
        :options="places"
        placeholder="Select a place"
        :error="v$.most_liked_place.$errors[0]?.$message"
      />

      <Field
        v-if="formData.most_liked_place === 'Other'"
        id="other_place"
        label="Other Place"
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
          button-text="register"
          :bg-color="v$.$invalid ? 'disabled' : 'primary'"
          type="submit"
          :disabled="v$.$invalid"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Field, ToggleSwitch, Dropdown, Slider, Button } from '@/components'
import { useVuelidate } from '@vuelidate/core'
import { createEditProfileSchema } from '@/utils/formValidation'
import { storeToRefs } from 'pinia'
import { useUserStore, useAuthStore } from '@/stores'
import { useToast } from 'vue-toastification'
import type { CurrentUserData } from '@/types'

const userStore = useUserStore()
const { user, userMessage } = storeToRefs(userStore)
const toast = useToast()

const authUserAction = useAuthStore()
const currentUserId = authUserAction.getUserId

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formData = ref<CurrentUserData>({
  username: '',
  email: '',
  first_name: null,
  last_name: null,
  has_pet: false,
  pet_name: null,
  has_liked_music_genre: false,
  liked_music_genre: null,
  has_most_liked_place: false,
  most_liked_place: null,
  other_place: '',
  feel_score: 0
})

const rules = createEditProfileSchema(computed(() => formData.value))
const v$ = useVuelidate<CurrentUserData>(rules, formData, { $autoDirty: true })

const musicGenres = [
  'Rock',
  'Pop',
  'Jazz',
  'Classical',
  'Hip Hop',
  'Electronic',
  'Country',
  'R&B',
  'Blues',
  'Reggae'
]

const places = [
  'Beach',
  'Mountains',
  'City',
  'Countryside',
  'Forest',
  'Desert',
  'Lake',
  'Island',
  'Other'
]

watch(
  () => formData.value.has_pet,
  (newValue) => {
    if (!newValue) formData.value.pet_name = null
  }
)

watch(
  () => formData.value.has_liked_music_genre,
  (newValue) => {
    if (!newValue) formData.value.liked_music_genre = null
  }
)

watch(
  () => formData.value.has_most_liked_place,
  (newValue) => {
    if (!newValue) {
      formData.value.most_liked_place = null
      formData.value.other_place = ''
    }
  }
)

onMounted(async () => {
  if (user.value) {
    Object.assign(formData.value, user.value)
  } else {
    await userStore.currentUser(currentUserId)
    if (user.value) {
      Object.assign(formData.value, user.value)
    }
  }
})

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  try {
    const payload = { ...formData.value }
    if (payload.most_liked_place === 'Other') {
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
  }
}
</script>
