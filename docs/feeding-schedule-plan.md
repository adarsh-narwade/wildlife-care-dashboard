# Feature Planning: Feeding Schedule

## Feature Overview
A feeding schedule planner that allows caretakers to plan feeding work by animal, date, and fruit, with tasks grouped by day.

## Current Status

An MVP version of this feature has been implemented in the dashboard.

Implemented:
- inline form for choosing animal, date, and fruit,
- grouped task list by day,
- per-task food amount using the existing food-calculation rules,
- remove action for deleting planned tasks,
- in-memory state managed in the client.

Not implemented yet:
- API persistence,
- task editing,
- duplicate-task prevention,
- filtering or time-range controls.

## User Requirements
- I want to plan when to feed which animal
- Per animal I want to be able to plan a day + a fruit that I feed them
- There should be an overview of all upcoming feeding tasks that tells me:
  - the animal name
  - the food fruit
  - the required amount of food
- The required amount of food should reuse the existing food-calculation rules in the dashboard
- Tasks should be grouped by day (todo list for each day)

## Technical Breakdown

### 1. Data Model
```typescript
type FeedingTask = {
  id: string
  animalName: string
  date: string
  fruit: Fruit
}
```

### 2. API Endpoints Needed
These are still future work. The current MVP keeps tasks in memory.

- `GET /api/feeding-tasks` - Get all feeding tasks
- `POST /api/feeding-tasks` - Create a new feeding task
- `DELETE /api/feeding-tasks/:id` - Delete a feeding task

### 3. Components Needed
- `FeedingSchedule.vue` - Main component displaying grouped tasks by day

The current MVP keeps the form and task rendering inside `FeedingSchedule.vue` to stay lightweight.

### 4. Implementation Order
1. Create composable `useFeedingSchedule` to manage tasks
2. Create `FeedingSchedule` UI for adding and listing tasks
3. Add grouped food calculations to each task row
4. Integrate the feeding schedule section into the main app
5. Add focused tests for task grouping and removal
6. Revisit persistence and editing in a later iteration

### 5. UI/UX Design
- **Main View**: List of days, each containing tasks for that day
- **Add Task**: Inline form with:
  - Animal selector (dropdown)
  - Date picker
  - Fruit selector
- **Task Row**: Shows animal name, fruit, food amount, and remove action

### 6. Questions/Clarifications Needed
- How far in advance should we show feeding tasks? (next 7 days, 30 days, all?)
- Should tasks be editable?
- Can multiple tasks be assigned to the same animal on the same day?
- How should we handle duplicate tasks for the same animal and date?
- Should we persist tasks between sessions?

## Next Iteration

- Add persistence through local storage or a simple server API.
- Prevent duplicate tasks for the same animal and date.
- Add edit support.
- Expand tests for date grouping and UI validation.
