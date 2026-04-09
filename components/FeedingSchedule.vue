<script setup lang="ts">
import type { Animal, Fruit } from '~/types'

const props = defineProps<{
  animals: Animal[]
}>()

const { groupedTasks, fruitOptions, addTask, removeTask } = useFeedingSchedule(toRef(props, 'animals'))

const today = new Date().toISOString().slice(0, 10)
const selectedAnimalName = ref(props.animals[0]?.name ?? '')
const selectedDate = ref(today)
const selectedFruit = ref<Fruit>(props.animals[0]?.favouriteFruit ?? 'banana')
const formError = ref('')

watch(
  () => props.animals,
  (nextAnimals) => {
    if (!selectedAnimalName.value && nextAnimals.length) {
      selectedAnimalName.value = nextAnimals[0].name
      selectedFruit.value = nextAnimals[0].favouriteFruit
    }
  },
  { immediate: true },
)

watch(selectedAnimalName, (animalName) => {
  const animal = props.animals.find(entry => entry.name === animalName)

  if (animal) {
    selectedFruit.value = animal.favouriteFruit
  }
})

const submitTask = () => {
  if (!selectedAnimalName.value || !selectedDate.value || !selectedFruit.value) {
    formError.value = 'Please choose an animal, date, and fruit.'
    return
  }

  if (selectedDate.value < today) {
    formError.value = 'Feeding tasks should be planned for today or later.'
    return
  }

  formError.value = ''
  addTask({
    animalName: selectedAnimalName.value,
    date: selectedDate.value,
    fruit: selectedFruit.value,
  })
}
</script>

<template>
  <section class="mt-8 border-t border-gray-300 py-4">
    <div class="max-w-4xl">
      <h2 class="text-2xl font-medium">
        Feeding Schedule
      </h2>
      <p class="mt-2 text-gray-700">
        Plan feeding tasks by animal and day, then review the required food amount grouped like a daily to-do list.
      </p>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <form class="rounded-lg border border-gray-200 bg-gray-50 p-4" @submit.prevent="submitTask">
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700" for="animal-name">Animal</label>
            <select
              id="animal-name"
              v-model="selectedAnimalName"
              class="w-full rounded border border-gray-300 bg-white px-3 py-2"
            >
              <option v-for="animal in animals" :key="animal.name" :value="animal.name">
                {{ animal.name }} ({{ animal.species }})
              </option>
            </select>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700" for="feeding-date">Feeding date</label>
            <input
              id="feeding-date"
              v-model="selectedDate"
              :min="today"
              class="w-full rounded border border-gray-300 bg-white px-3 py-2"
              type="date"
            >
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700" for="feeding-fruit">Fruit</label>
            <select
              id="feeding-fruit"
              v-model="selectedFruit"
              class="w-full rounded border border-gray-300 bg-white px-3 py-2"
            >
              <option v-for="fruit in fruitOptions" :key="fruit" :value="fruit">
                {{ fruit }}
              </option>
            </select>
          </div>

          <p v-if="formError" class="text-sm text-red-600">
            {{ formError }}
          </p>

          <button class="w-full rounded bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700" type="submit">
            Add feeding task
          </button>
        </div>
      </form>

      <div>
        <div
          v-if="!groupedTasks.length"
          class="rounded-lg border border-dashed border-gray-300 p-6 text-gray-500"
        >
          No feeding tasks planned yet.
        </div>

        <div v-else class="space-y-5">
          <section
            v-for="group in groupedTasks"
            :key="group.date"
            class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div class="mb-3 flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ group.label }}
              </h3>
              <span class="text-sm text-gray-500">
                {{ group.tasks.length }} task{{ group.tasks.length === 1 ? "" : "s" }}
              </span>
            </div>

            <div class="space-y-3">
              <article
                v-for="task in group.tasks"
                :key="task.id"
                class="flex flex-col gap-3 rounded border border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p class="font-medium text-gray-900">
                    {{ task.animalName }}
                  </p>
                  <p class="text-sm text-gray-600 capitalize">
                    Fruit: {{ task.fruit }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Required food: {{ task.foodAmount ?? "Unavailable" }}<span v-if="task.foodAmount !== null"> kg</span>
                  </p>
                </div>

                <button
                  class="self-start rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 transition hover:border-red-300 hover:text-red-600 sm:self-auto"
                  type="button"
                  @click="removeTask(task.id)"
                >
                  Remove
                </button>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
