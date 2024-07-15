<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center">
        <svg
          class="h-10 w-10 fill-white transition-all duration-500 hover:fill-red-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
          />
        </svg>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div v-if="!isAuthenticated" class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              @click="openModal('register')"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Register
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="openModal('signIn')"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Sign In
            </button>
          </MenuItem>
        </div>
        <div v-else class="px-1 py-1">
          <MenuItem v-if="authStore.getAdminCheck" v-slot="{ active }">
            <button
              @click="openModal('manageUsers')"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Manage Users
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="openModal('displayData')"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Your Profile
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click="handleLogout"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm'
              ]"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>

  <Modal
    v-for="(modal, index) in modals"
    :key="index"
    :is-open="modal.isOpen"
    :title="modal.title"
    :show-close-icon="modalsWithCloseIcon.includes(modal.name)"
    :size="modal.size"
    @close="closeModal(modal.name)"
  >
    <component
      :is="modal.component"
      v-bind="modal.props"
      @close="closeModal(modal.name)"
      @info="openModal('info')"
      @open-modal="handleChildModalOpen"
      @change-page="handlePageChange"
      @toggle-user-status="handleToggleUserStatus"
      @search="handleSearch"
    />
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  Modal,
  SignIn,
  Register,
  Info,
  DisplayData,
  EditProfile,
  UpdatePassword,
  ForgotPassword,
  ManageUsers
} from '@/components'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useAuthStore, useUserStore } from '@/stores'

type ModalName =
  | 'signIn'
  | 'register'
  | 'info'
  | 'displayData'
  | 'editProfile'
  | 'updatePassword'
  | 'forgotPassword'
  | 'manageUsers'

const PAGINATION_DISPLAY_LIMIT = 5

const authStore = useAuthStore()
const userStore = useUserStore()
const { isAuthenticated, userMessage } = storeToRefs(authStore)
const { users, currentPage, totalPages, isUserActive } = storeToRefs(useUserStore())
const toast = useToast()

const isUsersFetching = ref(false)
const previousSearchTerm = ref('')
const modalStates = ref({
  signIn: false,
  register: false,
  info: false,
  displayData: false,
  editProfile: false,
  updatePassword: false,
  forgotPassword: false,
  manageUsers: false
})

const modalSizes: Partial<Record<ModalName, string>> = {
  displayData: 'xl',
  editProfile: '2xl',
  manageUsers: '2xl'
}

const modals = computed(() =>
  [
    {
      name: 'signIn' as const,
      isOpen: modalStates.value.signIn,
      title: 'Sign In To Your Account',
      component: SignIn,
      size: modalSizes.signIn
    },
    {
      name: 'register' as const,
      isOpen: modalStates.value.register,
      title: 'Register to This Web',
      component: Register,
      size: modalSizes.register
    },
    {
      name: 'info' as const,
      isOpen: modalStates.value.info,
      title: 'Important Notice!',
      component: Info,
      size: modalSizes.info
    },
    {
      name: 'displayData' as const,
      isOpen: modalStates.value.displayData,
      title: 'User Profile',
      component: DisplayData,
      size: modalSizes.displayData
    },
    {
      name: 'editProfile' as const,
      isOpen: modalStates.value.editProfile,
      title: 'Edit Profile',
      component: EditProfile,
      size: modalSizes.editProfile
    },
    {
      name: 'updatePassword' as const,
      isOpen: modalStates.value.updatePassword,
      title: 'Update Password',
      component: UpdatePassword,
      size: modalSizes.updatePassword
    },
    {
      name: 'forgotPassword' as const,
      isOpen: modalStates.value.forgotPassword,
      title: 'Forgot Password',
      component: ForgotPassword,
      size: modalSizes.forgotPassword
    },
    {
      name: 'manageUsers' as const,
      isOpen: modalStates.value.manageUsers,
      title: 'Users Management (Administrator Only)',
      component: ManageUsers,
      size: modalSizes.manageUsers,
      props: {
        usersData: users.value,
        currentPage: currentPage.value,
        totalPages: totalPages.value,
        loading: isUsersFetching.value,
        userStatus: Boolean(isUserActive),
        searchTerm: userStore.searchTerm
      }
    }
  ].map((modal) => ({
    ...modal,
    size: modalSizes[modal.name as keyof typeof modalSizes]
  }))
)

const modalsWithCloseIcon = ['info', 'displayData', 'manageUsers']

const openModal = (modalName: ModalName) => {
  modalStates.value[modalName] = true
  if (modalName === 'manageUsers') {
    fetchUsers()
  }
}

const closeModal = (modalName: ModalName) => {
  modalStates.value[modalName] = false
  if (modalName === 'editProfile' || modalName === 'updatePassword') {
    openModal('displayData')
  }
  if (modalName === 'forgotPassword') openModal('signIn')
}

const handleChildModalOpen = (modalName: ModalName) => {
  if (modalName === 'editProfile' || modalName === 'updatePassword') {
    closeModal('displayData')
  }

  if (modalName === 'forgotPassword') closeModal('signIn')
  openModal(modalName)
}

const fetchUsers = async (pageNumber: number = 1, search: string = '') => {
  isUsersFetching.value = true
  try {
    await userStore.getUsers(pageNumber, PAGINATION_DISPLAY_LIMIT, search)
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    isUsersFetching.value = false
  }
}

const handlePageChange = (pageNumber: number) => {
  fetchUsers(pageNumber, userStore.searchTerm)
}

const handleSearch = (searchTerm: string) => {
  if (searchTerm !== previousSearchTerm.value) {
    userStore.setSearchTerm(searchTerm)
    fetchUsers(1, searchTerm) // Reset to first page when searching
    previousSearchTerm.value = searchTerm
  }
}

const handleToggleUserStatus = async (userId: string) => {
  isUsersFetching.value = true
  try {
    const success = await userStore.toggleUserStatus(userId)
    if (success) {
      await fetchUsers(currentPage.value)
    }
  } catch (error) {
    console.error('Error toggling user status:', error)
    toast.error('Failed to update user status')
  } finally {
    isUsersFetching.value = false
  }
}

const handleLogout = async () => {
  try {
    if (isAuthenticated.value) {
      await authStore.logout()
      toast.info(userMessage.value)
    }
  } catch (error) {
    toast.error('Logout failed')
    console.error('Logout failed')
  }
}

watch(
  () => userStore.searchTerm,
  (newTerm) => {
    if (newTerm !== previousSearchTerm.value) {
      fetchUsers(1, newTerm)
      previousSearchTerm.value = newTerm
    }
  }
)
</script>
