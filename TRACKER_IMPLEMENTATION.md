# Tracker Implementation Guide

## Overview
Implementasi lengkap untuk Activity Tracker dengan fitur:
- Progress bar yang berfungsi berdasarkan checklist hari ini
- Repeat options (Hari Ini Saja, Harian, Mingguan)
- Celebration effect saat semua task selesai
- Calendar marking untuk hari dengan task completed

## Data Structure

### TodoItem
```typescript
interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean; // deprecated, use completedDates
  category: "preparation" | "daily" | "special";
  repeat: "once" | "daily" | "weekly";
  createdDate: string; // YYYY-MM-DD
  completedDates: string[]; // Array of YYYY-MM-DD
}
```

### Key Changes from Old Structure
1. Added `repeat` field untuk menentukan frekuensi task
2. Added `createdDate` untuk tracking kapan task dibuat
3. Added `completedDates` array untuk tracking completion per hari
4. `completed` boolean deprecated, diganti dengan `completedDates`

## Features Implementation

### 1. Repeat Options
Saat membuat/edit task, user bisa pilih:
- **Hari Ini Saja** (`once`): Task hanya muncul di hari dibuat
- **Harian** (`daily`): Task muncul setiap hari mulai dari hari dibuat
- **Mingguan** (`weekly`): Task muncul setiap minggu di hari yang sama

### 2. Daily Progress
Progress bar menghitung berdasarkan:
- Total tasks yang visible hari ini (sesuai repeat type)
- Tasks yang sudah completed hari ini
- Formula: `(completed today / total today) * 100`

### 3. Celebration Effect
Ketika semua tasks hari ini completed:
- Tampilkan confetti animation
- Play sound effect (optional)
- Show congratulations message
- Auto-hide after 3 seconds

### 4. Calendar Marking
Di CalendarCard, hari yang fully completed:
- Background hijau dengan checkmark icon
- Tooltip showing completion stats
- Different style dari hari biasa

## Implementation Steps

### Step 1: Update Types
Create `src/types/tracker.ts` with new interfaces

### Step 2: Create Utility Functions
Create `src/lib/trackerUtils.ts` with helper functions:
- `getTodayString()`: Get current date as YYYY-MM-DD
- `isTodoVisibleToday(todo)`: Check if todo should show today
- `isTodoCompletedToday(todo)`: Check if todo completed today
- `getTodosForToday(todos)`: Filter todos for today
- `getTodayProgress(todos)`: Calculate today's progress
- `getDayCompletions(todos)`: Get completion data for all days
- `isDateFullyCompleted(date, todos)`: Check if date fully completed

### Step 3: Create Confetti Component
Create `src/components/Confetti.tsx` for celebration effect

### Step 4: Update TrackerSection
Major changes needed:
1. Import new types and utils
2. Update state management for todos
3. Add repeat field to add/edit modal
4. Update toggleTodo to use completedDates
5. Add celebration effect trigger
6. Update progress calculation

### Step 5: Update CalendarCard
1. Pass todos data as prop
2. Check each date for completion
3. Add visual indicator for completed dates
4. Add tooltip with stats

## Code Examples

### Toggle Todo (New Implementation)
```typescript
const toggleTodo = (id: string) => {
  const today = getTodayString();
  
  setTodos(todos.map(todo => {
    if (todo.id === id) {
      const isCompletedToday = todo.completedDates.includes(today);
      
      if (isCompletedToday) {
        // Uncheck: remove today from completedDates
        return {
          ...todo,
          completedDates: todo.completedDates.filter(d => d !== today)
        };
      } else {
        // Check: add today to completedDates
        return {
          ...todo,
          completedDates: [...todo.completedDates, today]
        };
      }
    }
    return todo;
  }));
};
```

### Check for Celebration
```typescript
useEffect(() => {
  const { completed, total } = getTodayProgress(todos);
  
  if (total > 0 && completed === total) {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  }
}, [todos]);
```

### Add Todo with Repeat
```typescript
const addTodo = () => {
  const newTodo: TodoItem = {
    id: Date.now().toString(),
    title: formData.title,
    description: formData.description,
    completed: false,
    category: formData.category,
    repeat: formData.repeat, // "once" | "daily" | "weekly"
    createdDate: getTodayString(),
    completedDates: []
  };
  
  setTodos([...todos, newTodo]);
};
```

## Migration Strategy

### For Existing Users
Old todos structure:
```json
{
  "id": "1",
  "title": "Task",
  "completed": true,
  "category": "daily"
}
```

New structure:
```json
{
  "id": "1",
  "title": "Task",
  "completed": true,
  "category": "daily",
  "repeat": "daily",
  "createdDate": "2026-01-30",
  "completedDates": ["2026-01-30"]
}
```

Migration function:
```typescript
const migrateTodos = (oldTodos: any[]): TodoItem[] => {
  const today = getTodayString();
  
  return oldTodos.map(todo => ({
    ...todo,
    repeat: todo.repeat || "daily",
    createdDate: todo.createdDate || today,
    completedDates: todo.completed ? [today] : []
  }));
};
```

## UI/UX Considerations

### Repeat Selector
```tsx
<select value={formData.repeat} onChange={...}>
  <option value="once">Hari Ini Saja</option>
  <option value="daily">Harian</option>
  <option value="weekly">Mingguan</option>
</select>
```

### Progress Display
```tsx
<div className="mb-4">
  <div className="flex justify-between mb-2">
    <span>Progress Hari Ini</span>
    <span>{completed}/{total}</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div 
      className="bg-primary-green h-3 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>
</div>
```

### Celebration Modal
```tsx
{showCelebration && (
  <>
    <Confetti />
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Alhamdulillah!</h2>
        <p>Semua aktivitas hari ini sudah selesai!</p>
      </div>
    </div>
  </>
)}
```

### Calendar Date Marking
```tsx
<div className={`
  text-center py-2 rounded-lg
  ${isDateFullyCompleted(dateString, todos) 
    ? "bg-primary-green text-white font-bold" 
    : day === today 
    ? "bg-primary-green text-white font-bold"
    : "text-gray-400"
  }
`}>
  {day}
  {isDateFullyCompleted(dateString, todos) && (
    <span className="ml-1">✓</span>
  )}
</div>
```

## Testing Checklist

- [ ] Create todo with "Hari Ini Saja" - should only show today
- [ ] Create todo with "Harian" - should show every day
- [ ] Create todo with "Mingguan" - should show same day each week
- [ ] Complete all todos - should trigger celebration
- [ ] Check calendar - completed days should be marked
- [ ] Refresh page - data should persist
- [ ] Complete todo, refresh, should still be completed
- [ ] Next day - daily todos should reset, once todos should hide
- [ ] Progress bar should update in real-time

## Performance Considerations

1. **LocalStorage**: Save on every change, but debounce if needed
2. **Calculations**: Memoize expensive calculations with useMemo
3. **Animations**: Use CSS animations, not JS
4. **Re-renders**: Use React.memo for child components

## Future Enhancements

1. **Streak Tracking**: Count consecutive days of completion
2. **Statistics**: Show weekly/monthly completion rates
3. **Reminders**: Browser notifications for incomplete tasks
4. **Categories**: Filter by category
5. **Export**: Download completion history as CSV
6. **Sync**: Cloud sync across devices

