import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import useFeedingSchedule from './useFeedingSchedule'
import type { Animal } from '~/types'

vi.stubGlobal('useState', (_key: string, init: () => unknown) => ref(init()))
vi.stubGlobal('computed', (getter: () => unknown) => ({
  get value() {
    return getter()
  },
}))
vi.stubGlobal('useCalculateFood', (animal: Animal) => animal.weight)

describe('useFeedingSchedule', () => {
  const animals = ref<Animal[]>([
    {
      name: 'Anika',
      species: 'elephant',
      gender: 'female',
      birthdate: '2001-05-14T00:00:00.000Z',
      favouriteFruit: 'banana',
      height: 3.2,
      weight: 4200,
    },
  ])

  it('groups tasks by date and exposes calculated food amounts', () => {
    const schedule = useFeedingSchedule(animals)

    schedule.addTask({
      animalName: 'Anika',
      date: '2026-04-10',
      fruit: 'apple',
    })

    expect(schedule.groupedTasks.value).toHaveLength(1)
    expect(schedule.groupedTasks.value[0].tasks[0].foodAmount).toBe(4200)
  })

  it('removes tasks by id', () => {
    const schedule = useFeedingSchedule(animals)

    schedule.addTask({
      animalName: 'Anika',
      date: '2026-04-10',
      fruit: 'banana',
    })

    const taskId = schedule.groupedTasks.value[0].tasks[0].id
    schedule.removeTask(taskId)

    expect(schedule.groupedTasks.value).toHaveLength(0)
  })
})
