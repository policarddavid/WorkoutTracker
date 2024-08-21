// Workout.ts
export interface Workout {
    name: string;
    id: string;
    days: Day[];
  }
export interface Day {
    name: string;
    exercises: Exercise[];
  }
export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }
