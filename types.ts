export type Fruit = 'banana' | 'apple' | 'cherry'
export type Gender = 'male' | 'female'
export type AnimalBirthdate = Date | string

export type Animal = {
  name: string
  species: string
  gender: Gender
  birthdate: AnimalBirthdate
  favouriteFruit: Fruit
  height: number
  weight: number
}

export type FeedingTask = {
  id: string
  animalName: string
  date: string
  fruit: Fruit
}
