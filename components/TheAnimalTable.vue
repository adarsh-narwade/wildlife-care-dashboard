<script lang="ts" setup>
import { computed, ref } from 'vue'
import AnimalDetailModal from './AnimalDetailModal.vue'
import type { Animal } from '~/types'
import useCalculateAgeInYears from '~/utils/useCalculateAgeInYears'

const props = defineProps<{
  animals: Animal[]
}>()

const selectedAnimal = ref<Animal | null>(null)

const animalsSortedByName = computed(() =>
  props.animals.slice().sort((animalA, animalB) =>
    animalA.name.localeCompare(animalB.name),
  ),
)

const showDetail = (animal: Animal) => {
  selectedAnimal.value = animal
}

const closeDetail = () => {
  selectedAnimal.value = null
}
</script>

<template>
  <div>
    <table>
      <caption class="sr-only">
        Animal directory with basic health and profile information.
      </caption>
      <thead>
        <tr>
          <th>Index</th>
          <th>Species</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Age (yrs)</th>
          <th>Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(animal, animalIndex) in animalsSortedByName"
          :key="`${animal.name}-${animal.birthdate}`"
          class="cursor-pointer"
          @click="showDetail(animal)"
        >
          <td>{{ animalIndex + 1 }}</td>
          <td>{{ animal.species }}</td>
          <td>{{ animal.name }}</td>
          <td>{{ animal.gender }}</td>
          <td>{{ useCalculateAgeInYears(animal.birthdate) }}</td>
          <td>{{ animal.weight }}</td>
        </tr>
      </tbody>
    </table>

    <AnimalDetailModal
      v-if="selectedAnimal"
      :animal="selectedAnimal"
      @close="closeDetail"
    />
  </div>
</template>

<style scoped>
table {
  @apply table-auto w-full text-left
}
td {
  @apply w-40
}
tr {
  @apply border-b-2
}
tbody tr {
  @apply hover:bg-gray-200
}
</style>
