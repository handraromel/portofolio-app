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
        <Dropdown
          id="filter-dropdown"
          :options="filterOptions"
          v-model="selectedFilter"
          placeholder="Filter by"
          class="mt-1 sm:w-40"
        />
        <div v-if="selectedFilter === 'date'" class="relative flex w-[307px] flex-row space-x-2">
          <Field type="datepicker" v-model="startDate" placeholder="Start Date" />
          <Field type="datepicker" v-model="endDate" placeholder="End Date" />
          <span
            v-if="dateError"
            class="absolute -bottom-5 -left-2 -z-10 text-xs text-red-700 sm:-left-[7px] sm:-top-[12px]"
          >
            Start date must be before or equal to end date
          </span>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-300 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-300 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isError" class="w-full rounded bg-red-700">
          <p class="px-2 py-0.5 font-semibold text-white">{{ userMessage }}</p>
        </div>
      </transition>
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
                <p>
                  <span class="font-bold">Username</span>: <span>{{ item.username }}</span>
                </p>
                <p>
                  <span class="font-bold">Email</span>: <span>{{ item.email }}</span>
                </p>
              </div>

              <div class="flex flex-row items-center">
                <ToggleSwitch
                  v-model="item.is_active"
                  :disabled="item.is_admin || toggleLoadingItem === item.id"
                  @update:modelValue="toggleUserStatus(item)"
                />
                <div class="text-sm font-bold">
                  <span>Status: </span>
                  <span
                    :class="{
                      'text-emerald-700': itemStatus(item) === 'active',
                      'text-red-700': itemStatus(item) === 'inactive',
                      'text-sky-500': itemStatus(item) === 'loading'
                    }"
                  >
                    {{
                      itemStatus(item) === 'loading'
                        ? 'Updating...'
                        : itemStatus(item) === 'active'
                          ? 'Active'
                          : 'Inactive'
                    }}
                  </span>
                  <span v-if="item.is_admin" class="text-sky-700"> || Administrator</span>
                </div>
              </div>
            </div>
            <div class="flex w-full sm:w-5/12 sm:items-end sm:justify-end">
              <p class="text-sm">
                <span>Date created: </span>
                <span v-if="item.createdAt" class="text-slate-500">{{
                  formatDate(item.createdAt)
                }}</span>
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
import { useTimeoutFn, useDebounceFn } from '@vueuse/core'
import { useUserStore } from '@/stores'
import { type UsersData, type Filters } from './types'
import { FilterOption } from './constant'
import { MAX_PAGE_ITEM, DEFAULT_TIMEOUT_BUFFER, FIVES_TIMEOUT_BUFFER } from '@/constant'
import { Pagination, ToggleSwitch, Field, Dropdown } from '@/components'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  usersData: UsersData[] | null
  currentPage: number
  totalPages: number
  loading: boolean
  searchTerm: string
}>()

const emit = defineEmits<{
  (e: 'toggle-user-status', userId: string): void
  (e: 'open-modal', modalName: string, data: UsersData): void
  (e: 'search', term: string): void
}>()

const loading = ref(props.loading)
const isError = ref(false)
const lastKnownItemCount = ref(0)
const toggleLoadingItem = ref<string | null>(null)
const currentFilters = ref<Filters>({})
const selectedFilter = ref('')
const startDate = ref('')
const endDate = ref('')
const dateError = ref(false)

const userStore = useUserStore()
const { userMessage } = storeToRefs(useUserStore())

const { start: startErrorTimeout } = useTimeoutFn(() => {
  isError.value = false
  userStore.$patch({ userMessage: '' })
}, FIVES_TIMEOUT_BUFFER)

const applyFilter = async (page: number = 1) => {
  currentFilters.value = {}

  switch (selectedFilter.value) {
    case FilterOption.Date:
      if (startDate.value && endDate.value) {
        dateError.value = false
        currentFilters.value.dateRange = `${startDate.value},${endDate.value}`
        if (startDate.value > endDate.value) {
          dateError.value = true
        }
      }
      break
    case FilterOption.ActiveUser:
      currentFilters.value.isActive = true
      break
    case FilterOption.InactiveUser:
      currentFilters.value.isActive = false
      break
    case FilterOption.Administrator:
      currentFilters.value.isAdmin = true
      break
    case FilterOption.ClearFilter:
      selectedFilter.value = ''
      startDate.value = ''
      endDate.value = ''
      dateError.value = false
      return
  }

  await userStore.getUsers(page, MAX_PAGE_ITEM, props.searchTerm, currentFilters.value)
}

const debounceSearch = useDebounceFn((term: string) => {
  emit('search', term)
}, DEFAULT_TIMEOUT_BUFFER)

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= props.totalPages && !loading.value) {
    lastKnownItemCount.value = MAX_PAGE_ITEM
    userStore.getUsers(newPage, MAX_PAGE_ITEM, props.searchTerm, currentFilters.value)
  }
}

const itemStatus = computed(() => (item: UsersData) => {
  if (toggleLoadingItem.value === item.id) {
    return 'loading'
  }
  return item.is_active ? 'active' : 'inactive'
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const toggleUserStatus = async (user: UsersData) => {
  toggleLoadingItem.value = user.id
  const previousState = user.is_active
  try {
    const success = await userStore.toggleUserStatus(user.id)
    if (success) {
      user.is_active = !previousState
    } else {
      user.is_active = previousState
    }
  } catch (error) {
    isError.value = true
    user.is_active = previousState
  } finally {
    toggleLoadingItem.value = null
  }
}

const filterOptions = computed(() => {
  const options = [
    { value: FilterOption.Date, label: 'Date' },
    { value: FilterOption.ActiveUser, label: 'Active User' },
    { value: FilterOption.InactiveUser, label: 'Inactive User' },
    { value: FilterOption.Administrator, label: 'Administrator' }
  ]
  if (Object.keys(currentFilters.value).length > 0) {
    options.unshift({ value: FilterOption.ClearFilter, label: 'Clear Filter' })
  }
  return options
})

const displayItems = computed((): UsersData[] => {
  if (props.loading) {
    return Array(lastKnownItemCount.value).fill({})
  }
  return props.usersData || []
})

watch(selectedFilter, (newValue) => {
  if (newValue !== FilterOption.Date) {
    applyFilter()
  }
})

watch([startDate, endDate], ([newStartDate, newEndDate], [oldStartDate, oldEndDate]) => {
  if (
    (newStartDate && newEndDate && (newStartDate !== oldStartDate || newEndDate !== oldEndDate)) ||
    (!newStartDate && !newEndDate && (oldStartDate || oldEndDate))
  ) {
    applyFilter()
  }
})

watch(
  () => props.loading,
  (newValue) => {
    loading.value = newValue
  }
)

watch(
  () => props.usersData,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      lastKnownItemCount.value = newValue.length
    }
  }
)

watch(userMessage, (newMessage) => {
  if (newMessage) {
    isError.value = true
    startErrorTimeout()
  } else {
    isError.value = false
  }
})
</script>
