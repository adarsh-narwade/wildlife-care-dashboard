import type { Ref } from 'vue'
import type { Animal, FeedingTask, Fruit } from '~/types'

const createTaskId = () => {
  return `${String(Date.now())}-${Math.random().toString(36).slice(2, 9)}`
}

export default (animals: Ref<Animal[]>) => {
  const tasks = useState<FeedingTask[]>('feeding-schedule-tasks', () => [])

  const addTask = (task: Omit<FeedingTask, 'id'>) => {
    tasks.value = [
      ...tasks.value,
      {
        ...task,
        id: createTaskId(),
      },
    ]
  }

  const removeTask = (taskId: string) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
  }

  const getTaskFoodAmount = (task: FeedingTask) => {
    const animal = animals.value.find(entry => entry.name === task.animalName)

    if (!animal) {
      return null
    }

    return useCalculateFood({
      ...animal,
      favouriteFruit: task.fruit,
    })
  }

  const groupedTasks = computed(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    return tasks.value
      .slice()
      .sort((taskA, taskB) =>
        taskA.date.localeCompare(taskB.date)
        || taskA.animalName.localeCompare(taskB.animalName),
      )
      .reduce<Array<{
      date: string
      label: string
      tasks: Array<FeedingTask & { foodAmount: number | null }>
    }>>((groups, task) => {
        const existingGroup = groups.find(group => group.date === task.date)
        const taskWithFood = {
          ...task,
          foodAmount: getTaskFoodAmount(task),
        }

        if (existingGroup) {
          existingGroup.tasks.push(taskWithFood)
          return groups
        }

        return [
          ...groups,
          {
            date: task.date,
            label: formatter.format(new Date(`${task.date}T00:00:00`)),
            tasks: [taskWithFood],
          },
        ]
      }, [])
  })

  const fruitOptions: Fruit[] = ['banana', 'apple', 'cherry']

  return {
    groupedTasks,
    fruitOptions,
    addTask,
    removeTask,
  }
}
