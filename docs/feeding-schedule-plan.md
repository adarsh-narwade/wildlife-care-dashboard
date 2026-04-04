# Feature Planning: Feeding Schedule

## Feature Overview
A feeding schedule planner that allows caretakers to plan feeding work by animal, date, and fruit, with tasks grouped by day.

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
  animalId: string
  date: Date
  fruit: Fruit
}
```

### 2. API Endpoints Needed
- `GET /api/feeding-tasks` - Get all feeding tasks
- `POST /api/feeding-tasks` - Create a new feeding task
- `DELETE /api/feeding-tasks/:id` - Delete a feeding task

### 3. Components Needed
- `FeedingSchedule.vue` - Main component displaying grouped tasks by day
- `FeedingTaskForm.vue` - Form to add new feeding tasks
- `FeedingTaskCard.vue` - Individual task display

### 4. Implementation Order
1. Create API endpoints for feeding tasks
2. Create composable `useFeedingSchedule` to manage tasks
3. Create `FeedingTaskCard` component
4. Create `FeedingTaskForm` component
5. Create `FeedingSchedule` main component
6. Add feeding schedule section to main app

### 5. UI/UX Design
- **Main View**: List of days, each containing tasks for that day
- **Add Task**: Modal or inline form with:
  - Animal selector (dropdown)
  - Date picker
  - Fruit selector
- **Task Card**: Shows animal name, fruit, food amount

### 6. Questions/Clarifications Needed
- How far in advance should we show feeding tasks? (next 7 days, 30 days, all?)
- Should tasks be editable?
- Can multiple tasks be assigned to the same animal on the same day?
- How should we handle past dates?
- Should there be any validation (e.g., don't allow duplicate animal feeding on same day)?

## Estimated Complexity
- **Backend**: Medium (CRUD operations, date handling)
- **Frontend**: Medium (forms, date grouping logic)
- **Testing**: Medium (food calculation, date grouping)
