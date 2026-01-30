export type RepeatType = "once" | "daily" | "weekly";

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: "preparation" | "daily" | "special";
  repeat: RepeatType;
  createdDate: string; // YYYY-MM-DD
  completedDates: string[]; // Array of YYYY-MM-DD when completed
}

export interface DayCompletion {
  date: string; // YYYY-MM-DD
  allCompleted: boolean;
  completedCount: number;
  totalCount: number;
}
