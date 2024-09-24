// Workout.ts
import React, { ReactNode } from "react";
export interface Workout {
    name: string;
    id: string;
    days: Day[];
    img?: ReactNode;
  }
export interface Day {
    name: string;
    exercises: Exercise[];
  }
  export class Exercise {
    name?: string;
    sets?: number;
    reps?: number;
    weight?: number;
    details: string;
  
    constructor(name: string, sets: number, reps: number, weight: number) {
      this.name = name;
      this.sets = sets;
      this.reps = reps;
      this.weight = weight;
      this.details = `${this.name} ${this.sets}x${this.reps} ${this.weight}lbs`;
      }
    }