<template>
  <div class="text-center">
    <div class="-mt-5 mb-5 flex w-full justify-center">
      <img class="h-20 w-20" src="/assets/stats/info.svg" alt="info" />
    </div>
    <p class="font-semibold text-sky-500">
      An email containing an activation link has been sent to your registered email address
    </p>
    <p class="text-sm font-normal text-slate-500">
      To complete the login process, please activate your account by clicking on the link provided
      in the email.
    </p>
    <div class="mt-10 flex items-center justify-center">
      <Button button-text="close me" @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components'

defineEmits<{
  (e: 'close'): void
}>()
</script>
