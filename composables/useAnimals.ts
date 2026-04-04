import type { Animal } from '~/types'

export default async () => {
  const { data, refresh, error, status } = await useFetch<Animal[]>('/api/animals', {
    key: 'animals',
    default: () => [],
  })

  const animals = computed(() => data.value ?? [])

  return {
    animals,
    error,
    refresh,
    status,
  }
}
