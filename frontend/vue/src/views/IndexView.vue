<script setup lang="ts">
import {
  SectionOne,
  SectionTwo,
  SectionThree,
  SectionFour,
  SectionFive,
  SectionSix,
  SectionSeven,
  SectionEight,
  SectionNine,
  SectionTen
} from '@/views/sections'
import { Separator, Footer, Navbar, VerifyEmail } from '@/components'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'

const { isAuthenticated } = storeToRefs(useAuthStore())
</script>

<template>
  <main>
    <Navbar />
    <SectionOne :is-authenticated="isAuthenticated" />
    <SectionTwo />
    <Separator />
    <SectionThree />
    <SectionFour />
    <SectionFive />
    <SectionSix />
    <SectionSeven />
    <SectionEight />
    <Separator />
    <SectionNine />
    <Separator />
    <SectionTen />
    <Footer />
    <VerifyEmail />
  </main>
</template>
