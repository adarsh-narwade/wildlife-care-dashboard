import type { AnimalBirthdate } from '~/types'

export default (birthdate: AnimalBirthdate) => {
  const normalizedBirthdate = new Date(birthdate)
  const today = new Date()
  const differenceInMilliseconds = today.getTime() - normalizedBirthdate.getTime()

  const years = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  return Math.ceil(years) || 1
}
