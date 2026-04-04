<script lang="ts" setup>
import { computed } from 'vue'
import type { Animal } from '~/types'
import useCalculateAgeInYears from '~/utils/useCalculateAgeInYears'

const props = defineProps<{
  animal: Animal
}>()

const emit = defineEmits<{
  close: []
}>()

const age = computed(() => useCalculateAgeInYears(props.animal.birthdate))
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="emit('close')">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">
          {{ animal.name }}
        </h2>
        <button
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          @click="emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Species</span>
          <span>{{ animal.species }}</span>
        </div>

        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Gender</span>
          <span>{{ animal.gender }}</span>
        </div>

        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Age</span>
          <span>{{ age }} years</span>
        </div>

        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Birthdate</span>
          <span>{{ new Date(animal.birthdate).toLocaleDateString() }}</span>
        </div>

        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Height</span>
          <span>{{ animal.height }} m</span>
        </div>

        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-600">Weight</span>
          <span>{{ animal.weight }} kg</span>
        </div>

        <div class="flex justify-between pb-2">
          <span class="font-semibold text-gray-600">Favourite Fruit</span>
          <span class="capitalize">{{ animal.favouriteFruit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
