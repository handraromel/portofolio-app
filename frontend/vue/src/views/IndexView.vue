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
import { Separator, Footer, Navbar } from '@/components'
</script>

<template>
  <main>
    <Navbar />
    <SectionOne />
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
  </main>
</template>
