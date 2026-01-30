import { TodoItem, DayCompletion, RepeatType } from "@/types/tracker";

export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const isTodoVisibleToday = (todo: TodoItem): boolean => {
  const today = getTodayString();
  const createdDate = todo.createdDate;
  
  if (todo.repeat === "once") {
    // Show only on created date
    return createdDate === today;
  } else if (todo.repeat === "daily") {
    // Show every day from created date onwards
    return createdDate <= today;
  } else if (todo.repeat === "weekly") {
    // Show on same day of week
    const created = new Date(createdDate);
    const todayDate = new Date(today);
    return created.getDay() === todayDate.getDay() && createdDate <= today;
  }
  
  return false;
};

export const isTodoCompletedToday = (todo: TodoItem): boolean => {
  const today = getTodayString();
  return todo.completedDates.includes(today);
};

export const getTodosForToday = (todos: TodoItem[]): TodoItem[] => {
  return todos.filter(isTodoVisibleToday);
};

export const getCompletedTodosToday = (todos: TodoItem[]): TodoItem[] => {
  return getTodosForToday(todos).filter(isTodoCompletedToday);
};

export const getTodayProgress = (todos: TodoItem[]): { completed: number; total: number; percentage: number } => {
  const todayTodos = getTodosForToday(todos);
  const completed = getCompletedTodosToday(todos).length;
  const total = todayTodos.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return { completed, total, percentage };
};

export const getDayCompletions = (todos: TodoItem[]): DayCompletion[] => {
  const completions: { [date: string]: DayCompletion } = {};
  
  todos.forEach(todo => {
    todo.completedDates.forEach(date => {
      if (!completions[date]) {
        completions[date] = {
          date,
          allCompleted: false,
          completedCount: 0,
          totalCount: 0
        };
      }
      completions[date].completedCount++;
    });
  });
  
  // Calculate total tasks for each date
  Object.keys(completions).forEach(date => {
    const todosForDate = todos.filter(todo => {
      if (todo.repeat === "once") {
        return todo.createdDate === date;
      } else if (todo.repeat === "daily") {
        return todo.createdDate <= date;
      } else if (todo.repeat === "weekly") {
        const created = new Date(todo.createdDate);
        const checkDate = new Date(date);
        return created.getDay() === checkDate.getDay() && todo.createdDate <= date;
      }
      return false;
    });
    
    completions[date].totalCount = todosForDate.length;
    completions[date].allCompleted = completions[date].completedCount === completions[date].totalCount && completions[date].totalCount > 0;
  });
  
  return Object.values(completions);
};

export const isDateFullyCompleted = (date: string, todos: TodoItem[]): boolean => {
  const completions = getDayCompletions(todos);
  const dayCompletion = completions.find(c => c.date === date);
  return dayCompletion?.allCompleted || false;
};
