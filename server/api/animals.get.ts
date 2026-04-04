import { ANIMALS } from '../../fakeData'

export const getAnimals = () => ANIMALS

export default eventHandler(() => {
  return getAnimals()
})
