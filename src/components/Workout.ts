// Workout.ts
import React, { ReactNode } from "react";

// Workout interface with an optional image represented as a string for JSON compatibility
export interface Workout {
  name: string;
  id: string;
  days: Day[];
  img: string;  // img can be a string for JSON or a ReactNode for React components
}

// Day interface, each day contains a list of exercises
export interface Day {
  name: string;
  exercises: Exercise[];
}

// Exercise class with the necessary properties and a details field
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
    this.details = `${name} ${sets}x${reps} ${weight}lbs`;
  }
}