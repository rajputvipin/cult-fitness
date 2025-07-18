import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { workoutPlans, dietPlans } from '../data/mockData';
import { 
  CalendarDaysIcon, 
  ChartBarIcon, 
  FireIcon, 
  TrophyIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      label: 'Workouts This Week', 
      value: '4/6', 
      icon: FireIcon, 
      color: 'from-orange-500 to-red-500',
      percentage: 67
    },
    { 
      label: 'Calories Burned', 
      value: '2,340', 
      icon: ChartBarIcon, 
      color: 'from-blue-500 to-cyan-500',
      percentage: 78
    },
    { 
      label: 'Streak Days', 
      value: '12', 
      icon: TrophyIcon, 
      color: 'from-purple-500 to-pink-500',
      percentage: 85
    },
    { 
      label: 'Avg Duration', 
      value: '45min', 
      icon: ClockIcon, 
      color: 'from-green-500 to-teal-500',
      percentage: 90
    }
  ];

  const todayWorkout = workoutPlans.find(plan => plan.day === new Date().toLocaleDateString('en-US', { weekday: 'long' }));

  const renderFreeUserPrompt = () => (
    <motion.div
      className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-6">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-2xl font-bold text-white mb-4">Unlock Your Full Potential</h3>
        <p className="text-gray-300 mb-6">
          Get personalized workout plans, nutrition guidance, and expert support with our premium plans.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-3xl mb-2">💪</div>
          <p className="text-white font-semibold">Custom Workouts</p>
          <p className="text-gray-400 text-sm">Tailored to your goals</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-3xl mb-2">🥗</div>
          <p className="text-white font-semibold">Nutrition Plans</p>
          <p className="text-gray-400 text-sm">Fuel your progress</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-3xl mb-2">📊</div>
          <p className="text-white font-semibold">Progress Tracking</p>
          <p className="text-gray-400 text-sm">See your improvements</p>
        </div>
      </div>
      
      <Link
        to="/plans"
        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
      >
        Choose Your Plan
      </Link>
    </motion.div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Message */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-gray-300">
          Ready to crush your fitness goals today? Let's make it happen!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">{stat.label}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Workout */}
      {todayWorkout && (
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Today's Workout</h3>
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm">
              {todayWorkout.difficulty}
            </span>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-purple-400 mb-2">
              {todayWorkout.muscle}
            </h4>
            <div className="flex items-center text-gray-300 text-sm space-x-4">
              <span>⏱️ {todayWorkout.duration} min</span>
              <span>💪 {todayWorkout.exercises.length} exercises</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {todayWorkout.exercises.slice(0, 2).map((exercise, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                <h5 className="font-semibold text-white mb-1">{exercise.name}</h5>
                <p className="text-gray-300 text-sm">{exercise.sets} sets × {exercise.reps} reps</p>
              </div>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 mt-4 flex items-center justify-center">
            <PlayIcon className="h-5 w-5 mr-2" />
            Start Workout
          </button>
        </motion.div>
      )}
    </div>
  );

  const renderWorkouts = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Workout Plan</h2>
      
      {user?.plan === 'free' ? renderFreeUserPrompt() : (
        <div className="grid gap-6">
          {workoutPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.day}</h3>
                  <p className="text-purple-400 font-semibold">{plan.muscle}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Duration: {plan.duration} min</p>
                  <p className="text-gray-300 text-sm">Difficulty: {plan.difficulty}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {plan.exercises.map((exercise, _exerciseIndex) => (
                  <div key={exercise.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{exercise.name}</h4>
                      <span className="text-gray-300 text-sm">
                        {exercise.sets} × {exercise.reps}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{exercise.instructions}</p>
                    <p className="text-gray-400 text-xs">Rest: {exercise.rest}s</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Nutrition Plan</h2>
      
      {user?.plan === 'free' ? renderFreeUserPrompt() : (
        <div className="grid gap-6">
          {dietPlans.map((meal, index) => (
            <motion.div
              key={meal.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{meal.meal}</h3>
                  <p className="text-purple-400">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-400 font-semibold">{meal.calories} cal</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <p className="text-blue-400 font-semibold">{meal.protein}g</p>
                  <p className="text-gray-300 text-sm">Protein</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <p className="text-green-400 font-semibold">{meal.carbs}g</p>
                  <p className="text-gray-300 text-sm">Carbs</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <p className="text-yellow-400 font-semibold">{meal.fat}g</p>
                  <p className="text-gray-300 text-sm">Fat</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Meal Items:</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-black min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-300 mt-2">
                Plan: <span className="capitalize text-purple-400 font-semibold">{user?.plan}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/plans"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-2">
            {[
              { id: 'overview', label: 'Overview', icon: ChartBarIcon },
              { id: 'workouts', label: 'Workouts', icon: FireIcon },
              { id: 'nutrition', label: 'Nutrition', icon: CalendarDaysIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'workouts' && renderWorkouts()}
          {activeTab === 'nutrition' && renderNutrition()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;