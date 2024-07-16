<template>
  <div>
    <label :for="id" class="mb-2 block text-sm font-medium text-gray-700">{{ label }}</label>
    <div v-if="type === 'textarea'">
      <Editor :id="id" :api-key="apiKey" v-model="editorContent" :init="tinymceConfig" />
    </div>
    <Datepicker
      v-else-if="type === 'datepicker'"
      :id="id"
      v-model="dateValue"
      :name="name"
      :placeholder="placeholder"
      format="yyyy-MM-dd"
      @update:modelValue="handleDateInput"
    />
    <input
      v-else
      :id="id"
      :type="type"
      :value="modelValue"
      :name="name"
      @input="handleInput"
      :class="fieldClasses"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

type inputType = 'text' | 'email' | 'password' | 'textarea' | 'datepicker'

const props = defineProps<{
  id?: string
  label?: string
  name?: string
  type: inputType
  modelValue: string | Date
  placeholder?: string
  error?: string
  isTextarea?: boolean
  rows?: number
}>()

const apiKey = import.meta.env.VITE_EDITOR_KEY

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleDateInput = (value: Date) => {
  emit('update:modelValue', value)
}

const fieldClasses = computed(() => [
  'block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
  props.error ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-red-400/50'
])

const editorContent = ref(props.modelValue)
const dateValue = ref(props.modelValue instanceof Date ? props.modelValue : '')

watch(editorContent, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (editorContent.value !== newValue) {
      editorContent.value = newValue as string
    }
    if (props.type === 'datepicker' && newValue instanceof Date) {
      dateValue.value = newValue
    }
  }
)

const tinymceConfig = {
  height: props.rows ? props.rows * 40 : 140,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  highlight_on_focus: false,
  toolbar:
    'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help'
}
</script>
