<template>
  <Form @submit="handleSubmit" :validation-schema="editProfileSchema" v-slot="{ errors }">
    <div class="space-y-6">
      <!-- Username -->
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <Field v-model="formData.username" name="username" v-slot="{ field, errorMessage }">
          <input
            v-bind="field"
            type="text"
            id="username"
            class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
          />
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <Field v-model="formData.email" name="email" v-slot="{ field, errorMessage }">
          <input
            v-bind="field"
            type="email"
            id="email"
            class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
          />
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- First Name -->
      <div>
        <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
        <Field v-model="formData.first_name" name="first_name" v-slot="{ field, errorMessage }">
          <input
            v-bind="field"
            type="text"
            id="first_name"
            class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
          />
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- Last Name -->
      <div>
        <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
        <Field v-model="formData.last_name" name="last_name" v-slot="{ field, errorMessage }">
          <input
            v-bind="field"
            type="text"
            id="last_name"
            class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
          />
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- Has Pet -->
      <div class="flex items-center">
        <Field v-model="formData.has_pet" name="has_pet" v-slot="{ field }">
          <Switch
            v-bind="field"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="formData.has_pet ? 'bg-red-500' : 'bg-gray-200'"
          >
            <span class="sr-only">Has Pet</span>
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              :class="formData.has_pet ? 'translate-x-6' : 'translate-x-1'"
            />
          </Switch>
        </Field>
        <span class="ml-3 text-sm font-medium text-gray-700">Has Pet</span>
      </div>

      <!-- Pet Name (conditional) -->
      <div v-if="formData.has_pet">
        <label for="pet_name" class="block text-sm font-medium text-gray-700">Pet Name</label>
        <Field v-model="formData.pet_name" name="pet_name" v-slot="{ field, errorMessage }">
          <input
            v-bind="field"
            type="text"
            id="pet_name"
            class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
          />
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- Has Liked Music Genre -->
      <div class="flex items-center">
        <Field
          v-model="formData.has_liked_music_genre"
          name="has_liked_music_genre"
          v-slot="{ field, errorMessage }"
        >
          <Switch
            v-bind="field"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="formData.has_liked_music_genre ? 'bg-red-500' : 'bg-gray-200'"
          >
            <span class="sr-only">Has Liked Music Genre</span>
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              :class="formData.has_liked_music_genre ? 'translate-x-6' : 'translate-x-1'"
            />
          </Switch>
        </Field>
        <span class="ml-3 text-sm font-medium text-gray-700">Has Liked Music Genre</span>
      </div>

      <!-- Liked Music Genre (conditional) -->
      <div v-if="formData.has_liked_music_genre" class="relative">
        <label for="liked_music_genre" class="block text-sm font-medium text-gray-700"
          >Liked Music Genre</label
        >
        <Field
          v-model="formData.liked_music_genre"
          name="liked_music_genre"
          v-slot="{ field, errorMessage }"
        >
          <Listbox v-model="formData.liked_music_genre">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md ring-1 ring-gray-300 focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm"
              >
                <span class="block truncate">
                  {{ formData.liked_music_genre || 'Select a music genre' }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="genre in musicGenres"
                    :key="genre"
                    :value="genre"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'bg-red-100 text-red-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ genre }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
      </div>

      <!-- Has Most Liked Place -->
      <div class="flex items-center">
        <Field
          v-model="formData.has_most_liked_place"
          name="has_most_liked_place"
          v-slot="{ field, errorMessage }"
        >
          <Switch
            v-bind="field"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="formData.has_most_liked_place ? 'bg-red-500' : 'bg-gray-200'"
          >
            <span class="sr-only">Has Most Liked Place</span>
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              :class="formData.has_most_liked_place ? 'translate-x-6' : 'translate-x-1'"
            />
          </Switch>
        </Field>
        <span class="ml-3 text-sm font-medium text-gray-700">Has Most Liked Place</span>
      </div>

      <!-- Most Liked Place (conditional) -->
      <div v-if="formData.has_most_liked_place" class="relative">
        <label for="most_liked_place" class="block text-sm font-medium text-gray-700"
          >Most Liked Place</label
        >
        <Field
          v-model="formData.most_liked_place"
          name="most_liked_place"
          v-slot="{ field, errorMessage }"
        >
          <Listbox v-bind="field">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md ring-1 ring-gray-300 focus:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm"
              >
                <span class="block truncate">
                  {{ formData.most_liked_place || 'Select a place' }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-for="place in places"
                    :key="place"
                    :value="place"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'bg-red-100 text-red-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4'
                      ]"
                    >
                      <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                        {{ place }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                      >
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <!-- Other Place (if "Other" is selected) -->
        <div v-if="formData.most_liked_place === 'Other'" class="mt-4">
          <label for="other_place" class="block text-sm font-medium text-gray-700"
            >Other Place</label
          >
          <Field v-model="formData.other_place" name="other_place" v-slot="{ field, errorMessage }">
            <input
              v-bind="field"
              type="text"
              id="other_place"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
            />
            <span class="text-sm text-red-500">{{ errorMessage }}</span>
          </Field>
        </div>
      </div>

      <!-- Feel Score -->
      <div>
        <label for="feel_score" class="block text-sm font-medium text-gray-700">Feel Score</label>
        <Field v-model="formData.feel_score" name="feel_score" v-slot="{ field, errorMessage }">
          <div class="relative mt-2">
            <input
              v-bind="field"
              type="range"
              id="feel_score"
              min="1"
              max="100"
              step="1"
              class="w-full appearance-none bg-transparent focus:outline-none"
              @input="updateFeelScore"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 right-0 h-2 rounded-full"
              :style="{
                background: `linear-gradient(to right, 
                  ${formData.feel_score <= 33 ? 'rgb(239, 68, 68)' : 'rgb(209, 213, 219)'} 0%, 
                  ${formData.feel_score <= 33 ? 'rgb(239, 68, 68)' : formData.feel_score <= 66 ? 'rgb(234, 179, 8)' : 'rgb(34, 197, 94)'} ${formData.feel_score}%, 
                  rgb(209, 213, 219) ${formData.feel_score}%, 
                  rgb(209, 213, 219) 100%)`
              }"
            ></div>
          </div>
          <span class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>
        <div class="mt-2 text-center font-semibold" :class="feelScoreColor">
          {{ formData.feel_score }}
        </div>
      </div>

      <div class="my-6 flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('close')"
          class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="Object.keys(errors).length > 0"
          class="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          :class="{ 'cursor-not-allowed opacity-50': Object.keys(errors).length > 0 }"
        >
          Save Changes
        </button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Form, Field, type SubmissionHandler } from 'vee-validate'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Switch } from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useUserStore, useAuthStore } from '@/stores'
import { useToast } from 'vue-toastification'
import { editProfileSchema } from '@/utils/formValidation'
import type { CurrentUserData } from '@/types'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const toast = useToast()

const authUserAction = useAuthStore()
const currentUserId = authUserAction.getUserId

const emit = defineEmits<{
  (e: 'close'): void
}>()

const formData = ref<CurrentUserData>({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  has_pet: false,
  pet_name: '',
  has_liked_music_genre: false,
  liked_music_genre: '',
  has_most_liked_place: false,
  most_liked_place: '',
  feel_score: 0
})

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

const feelScoreColor = computed(() => {
  if (formData.value.feel_score <= 33) return 'text-red-500'
  if (formData.value.feel_score <= 66) return 'text-yellow-500'
  return 'text-green-500'
})

const updateFeelScore = (event: Event) => {
  formData.value.feel_score = parseInt((event.target as HTMLInputElement).value)
}

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

const handleSubmit: SubmissionHandler = async (payload: Record<string, any>) => {
  try {
    console.log(payload)
    // await userStore.updateUser(currentUserId, payload as CurrentUserData)
    // toast.success('Profile updated successfully')
    // emit('close')
  } catch (error) {
    toast.error('Failed to update profile')
    console.error('Update profile error:', error)
  }
}
</script>
