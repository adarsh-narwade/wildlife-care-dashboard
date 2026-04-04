import type { Animal } from '~/types'
import useCalculateAgeInYears from '~/utils/useCalculateAgeInYears'

export default (animal: Animal) => {
  const age = useCalculateAgeInYears(animal.birthdate)

  if (animal.species.toLowerCase() === 'fish') {
    return 0
  }

  let foodRequired = (animal.height + animal.weight) / 250

  if (age > 20) {
    foodRequired = foodRequired / 2
  } else if (age < 2) {
    foodRequired = foodRequired * 2
  }

  if (animal.favouriteFruit === 'cherry') {
    foodRequired = foodRequired + 28
  }

  if (animal.gender === 'male') {
    foodRequired = foodRequired * 1.2
  }

  return Math.round(foodRequired * 100) / 100
}
