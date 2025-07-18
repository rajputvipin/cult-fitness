import { User, WorkoutPlan, DietPlan, Plan, Facility } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'premium',
  joinDate: '2024-01-15',
};

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    day: 'Monday',
    muscle: 'Chest & Triceps',
    duration: 60,
    difficulty: 'Intermediate',
    exercises: [
      {
        id: '1',
        name: 'Bench Press',
        sets: 4,
        reps: '8-10',
        rest: 90,
        instructions: 'Keep your back flat and lower the bar to your chest'
      },
      {
        id: '2',
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10-12',
        rest: 60,
        instructions: 'Set bench to 30-45 degrees and press up and slightly back'
      },
      {
        id: '3',
        name: 'Tricep Dips',
        sets: 3,
        reps: '12-15',
        rest: 45,
        instructions: 'Lower body until arms are at 90 degrees'
      }
    ]
  },
  {
    id: '2',
    day: 'Tuesday',
    muscle: 'Back & Biceps',
    duration: 65,
    difficulty: 'Intermediate',
    exercises: [
      {
        id: '4',
        name: 'Pull-ups',
        sets: 4,
        reps: '6-8',
        rest: 90,
        instructions: 'Pull your body up until chin is over the bar'
      },
      {
        id: '5',
        name: 'Barbell Rows',
        sets: 4,
        reps: '8-10',
        rest: 75,
        instructions: 'Keep your back straight and pull bar to your lower chest'
      },
      {
        id: '6',
        name: 'Bicep Curls',
        sets: 3,
        reps: '10-12',
        rest: 60,
        instructions: 'Keep elbows stationary and curl weight to shoulders'
      }
    ]
  },
  {
    id: '3',
    day: 'Wednesday',
    muscle: 'Legs',
    duration: 70,
    difficulty: 'Advanced',
    exercises: [
      {
        id: '7',
        name: 'Squats',
        sets: 5,
        reps: '8-10',
        rest: 120,
        instructions: 'Lower until thighs are parallel to ground'
      },
      {
        id: '8',
        name: 'Deadlifts',
        sets: 4,
        reps: '6-8',
        rest: 120,
        instructions: 'Keep bar close to body and lift with your legs'
      },
      {
        id: '9',
        name: 'Leg Press',
        sets: 3,
        reps: '12-15',
        rest: 90,
        instructions: 'Lower weight until knees are at 90 degrees'
      }
    ]
  }
];

export const dietPlans: DietPlan[] = [
  {
    id: '1',
    meal: 'Breakfast',
    time: '7:00 AM',
    calories: 450,
    protein: 25,
    carbs: 40,
    fat: 18,
    items: ['Oatmeal with berries', 'Greek yogurt', 'Almonds', 'Banana']
  },
  {
    id: '2',
    meal: 'Lunch',
    time: '12:30 PM',
    calories: 550,
    protein: 35,
    carbs: 45,
    fat: 20,
    items: ['Grilled chicken breast', 'Brown rice', 'Steamed vegetables', 'Avocado']
  },
  {
    id: '3',
    meal: 'Dinner',
    time: '7:00 PM',
    calories: 500,
    protein: 30,
    carbs: 35,
    fat: 22,
    items: ['Salmon fillet', 'Quinoa', 'Roasted vegetables', 'Olive oil']
  }
];

export const plans: Plan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 999,
    duration: '1 Month',
    color: 'from-blue-400 to-blue-600',
    features: [
      'Basic workout plans',
      'Mobile app access',
      'Progress tracking',
      'Email support'
    ]
  },
  {
    id: '2',
    name: 'Premium',
    price: 2499,
    duration: '3 Months',
    color: 'from-purple-400 to-purple-600',
    popular: true,
    features: [
      'Personalized workout plans',
      'Diet planning',
      'Progress analytics',
      'Priority support',
      'Video tutorials'
    ]
  },
  {
    id: '3',
    name: 'Elite',
    price: 4999,
    duration: '6 Months',
    color: 'from-orange-400 to-orange-600',
    features: [
      'Personal trainer sessions',
      'Custom nutrition plans',
      'Advanced analytics',
      '24/7 support',
      'Exclusive content',
      'One-on-one consultations'
    ]
  }
];

export const facilities: Facility[] = [
  {
    id: '1',
    name: 'Strength Training',
    description: 'State-of-the-art weight training equipment',
    icon: '💪',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '2',
    name: 'Cardio Zone',
    description: 'Modern cardio equipment for all fitness levels',
    icon: '🏃‍♀️',
    image: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '3',
    name: 'Yoga Studio',
    description: 'Peaceful space for yoga and meditation',
    icon: '🧘‍♀️',
    image: 'https://images.pexels.com/photos/3822167/pexels-photo-3822167.jpeg?auto=compress&cs=tinysrgb&w=500'
  },
  {
    id: '4',
    name: 'Swimming Pool',
    description: 'Olympic-sized pool for aquatic fitness',
    icon: '🏊‍♀️',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500'
  }
];