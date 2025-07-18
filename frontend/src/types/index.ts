export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'basic' | 'premium' | 'elite';
  joinDate: string;
  avatar?: string;
}

export interface WorkoutPlan {
  id: string;
  day: string;
  muscle: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  instructions: string;
}

export interface DietPlan {
  id: string;
  meal: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items: string[];
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}