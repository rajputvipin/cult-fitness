"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { workoutAPI } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Target, Zap, Heart, User, CreditCard } from "lucide-react"
import Link from "next/link"

interface WeeklyPlan {
  _id: string
  plan: {
    day: string
    workout: string
    completed: boolean
  }[]
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchWeeklyPlan()
    }
  }, [user])

  const fetchWeeklyPlan = async () => {
    try {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1) // Monday

      const response = await workoutAPI.getWeeklyPlan(weekStart.toISOString())
      setWeeklyPlan(response.data.weeklyPlan)
    } catch (error) {
      console.error("Failed to fetch weekly plan:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-300 mb-6">Please log in to view your dashboard</p>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const hasPlan = user.plan !== "Free"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-gray-300">Ready to crush your fitness goals today?</p>
        </div>

        {hasPlan ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Streak</p>
                      <p className="text-3xl font-bold text-white">{user.stats?.currentStreak || 0}</p>
                      <p className="text-gray-400 text-sm">days</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Workouts Done</p>
                      <p className="text-3xl font-bold text-white">{user.stats?.totalWorkouts || 0}</p>
                      <p className="text-gray-400 text-sm">total</p>
                    </div>
                    <Trophy className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Calories Burned</p>
                      <p className="text-3xl font-bold text-white">
                        {user.stats?.totalCaloriesBurned?.toLocaleString() || 0}
                      </p>
                      <p className="text-gray-400 text-sm">total</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Plan</p>
                      <p className="text-2xl font-bold text-white">{user.plan}</p>
                      <p className="text-gray-400 text-sm">active</p>
                    </div>
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Plan */}
            {weeklyPlan && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    This Week's Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyPlan.plan.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${day.completed ? "bg-green-400" : "bg-gray-400"}`} />
                          <div>
                            <p className="text-white font-medium capitalize">{day.day}</p>
                            <p className="text-gray-400 text-sm">{day.workout || "Rest Day"}</p>
                          </div>
                        </div>
                        <Badge variant={day.completed ? "default" : "secondary"}>
                          {day.completed ? "Done" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Session
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Heart className="mr-2 h-4 w-4" />
                    Nutrition Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          // No Plan - Show Upgrade Options
          <div className="text-center py-16">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-12">
                <CreditCard className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Fitness Potential</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Get access to personalized workout plans, nutrition guidance, and expert trainers to accelerate your
                  fitness journey.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center text-gray-300">
                    <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                    Personalized workout plans
                  </div>
                  <div className="flex items-center justify-center text-gray-300">
                    <Heart className="h-5 w-5 text-red-400 mr-2" />
                    Custom nutrition guidance
                  </div>
                  <div className="flex items-center justify-center text-gray-300">
                    <User className="h-5 w-5 text-blue-400 mr-2" />
                    One-on-one trainer sessions
                  </div>
                  <div className="flex items-center justify-center text-gray-300">
                    <Zap className="h-5 w-5 text-green-400 mr-2" />
                    Progress tracking & analytics
                  </div>
                </div>

                <Link href="/payment">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4"
                  >
                    Choose Your Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
