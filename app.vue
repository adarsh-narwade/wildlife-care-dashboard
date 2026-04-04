<script setup lang="ts">
const { animals, error, status } = await useAnimals()

const nextMonthDate = computed(() => {
  const currentDate = new Date()
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
})

const daysInNextMonth = computed(() => {
  return new Date(
    nextMonthDate.value.getFullYear(),
    nextMonthDate.value.getMonth() + 1,
    0,
  ).getDate()
})

const nextMonthLabel = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(nextMonthDate.value)
})

const totalFoodForNextMonth = computed(() => {
  if (!animals.value.length) {
    return 0
  }

  return animals.value.reduce((total, animal) => {
    return total + useCalculateFood(animal) * daysInNextMonth.value
  }, 0)
})
</script>

<template>
  <div class="container mx-auto my-10 px-4">
    <h1 class="text-4xl font-semibold tracking-tight">
      Wildlife Care Dashboard
    </h1>
    <div class="my-3 max-w-3xl space-y-2 text-gray-700">
      <p>
        A compact operations dashboard for reviewing animal records, checking core health details,
        and estimating feeding demand for the upcoming month.
      </p>
      <p>
        Built as a small personal project in Nuxt 3 to explore typed full-stack patterns, simple
        data modelling, and table-based UI design.
      </p>
    </div>

    <div class="mt-6 border-t border-gray-300 py-4">
      <h2 class="text-2xl font-medium">
        Feeding Forecast
      </h2>
      <p class="mt-2 text-lg">
        Estimated food required for {{ nextMonthLabel }}:
        <span class="font-bold">{{ Math.round(totalFoodForNextMonth) }} kg</span>
      </p>
    </div>

    <div v-if="error" class="mt-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      Unable to load animal data right now. Please refresh and try again.
    </div>

    <div class="mt-6 border-t border-gray-300 py-4">
      <h2 class="text-2xl font-medium">
        Animal Directory
      </h2>
    </div>
    <p v-if="status === 'pending'" class="text-gray-500">
      Loading animal data...
    </p>
    <the-animal-table v-else :animals="animals" />
  </div>
</template>
