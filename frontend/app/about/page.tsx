"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Heart, Target } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Heart,
    title: "Passion for Fitness",
    description:
      "We believe fitness is not just about physical transformation, but about building confidence and mental strength.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Our supportive community helps you stay motivated and accountable throughout your fitness journey.",
  },
  {
    icon: Award,
    title: "Excellence in Training",
    description: "Our certified trainers bring years of experience and cutting-edge techniques to help you succeed.",
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description:
      "Every program is designed with your specific goals in mind, ensuring maximum results and satisfaction.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cult Fitness
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Founded in 2020, Cult Fitness has been at the forefront of the fitness revolution, combining cutting-edge
              technology with personalized training to help thousands achieve their dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Cult Fitness Gym"
                width={600}
                height={500}
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                What started as a small gym with a big vision has grown into a fitness empire. We recognized that
                traditional fitness approaches weren't working for everyone, so we created a revolutionary system that
                adapts to each individual's needs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we're proud to serve over 10,000 active members across multiple locations, with state-of-the-art
                facilities and a team of expert trainers who are passionate about helping you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape the experience we create for our members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                        <value.icon className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-gray-300">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-gray-300">Expert Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                15
              </div>
              <div className="text-gray-300">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                4.9
              </div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
