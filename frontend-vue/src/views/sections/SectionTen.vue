<template>
  <div id="contact" class="my-24 bg-white text-slate-500">
    <div class="container mx-auto px-4">
      <h2 class="mb-4 text-center text-4xl font-bold tracking-wider text-gray-800">
        KEEP IN TOUCH
      </h2>
      <p class="mb-8 text-center text-lg text-gray-600">
        Nullam sit amet odio eu est aliquet euismod a a urna. Proin eu urna suscipit, dictum quam
        nec.
      </p>
      <div class="mb-20 flex justify-center">
        <Decoration />
      </div>

      <div class="flex flex-wrap justify-center gap-10">
        <div class="w-full bg-white p-8 drop-shadow-lg md:w-9/12 lg:w-7/12">
          <form id="contact-us">
            <div class="mb-4">
              <input
                type="text"
                placeholder="Name"
                class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="mb-4">
              <input
                type="text"
                placeholder="Subject"
                class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="mb-4">
              <textarea
                placeholder="Message"
                rows="4"
                class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 transition duration-300 ease-in-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400/50 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <div class="w-full pl-0.5">
              <Button button-text="send message" />
            </div>
          </form>
        </div>

        <div class="w-full bg-white p-8 drop-shadow-lg md:w-9/12 lg:w-7/12">
          <h3 class="mb-4 text-xl font-bold text-red-500">OUR ADDRESS</h3>
          <p class="mb-6">House #13, Streat road, Sydney 2310 Australia</p>

          <h3 class="mb-4 text-xl font-bold text-red-500">CALL US</h3>
          <p class="mb-2">+ 880 168 109 1425</p>
          <p class="mb-6">+ 0216809142</p>

          <h3 class="mb-4 text-xl font-bold text-red-500">EMAIL US</h3>
          <p>contactus@email.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Decoration, Button } from '@/components'
</script>
