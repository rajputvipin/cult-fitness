"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Waves, Zap, Users, Heart, Utensils } from "lucide-react"
import Image from "next/image"

const facilities = [
  {
    icon: Dumbbell,
    title: "Strength Training Zone",
    description:
      "State-of-the-art weight training equipment including free weights, machines, and functional training tools.",
    features: ["Olympic Barbells", "Dumbbells up to 100lbs", "Cable Machines", "Power Racks"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Cardio Theater",
    description: "Premium cardiovascular equipment with entertainment systems to make your cardio sessions enjoyable.",
    features: ["Treadmills with TV", "Elliptical Machines", "Stationary Bikes", "Rowing Machines"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Group Fitness Studios",
    description:
      "Spacious studios designed for high-energy group classes with professional sound and lighting systems.",
    features: ["Yoga Classes", "HIIT Training", "Dance Fitness", "Pilates"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Olympic-size swimming pool with separate lanes for different skill levels and aqua fitness classes.",
    features: ["25m Pool", "Aqua Aerobics", "Swimming Lessons", "Poolside Relaxation"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-teal-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Recovery Zone",
    description:
      "Dedicated space for post-workout recovery with massage chairs, stretching areas, and relaxation pods.",
    features: ["Massage Chairs", "Stretching Area", "Sauna", "Steam Room"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Utensils,
    title: "Nutrition Bar",
    description: "Healthy food and beverage options including protein shakes, fresh juices, and nutritious meals.",
    features: ["Protein Shakes", "Fresh Juices", "Healthy Meals", "Supplements"],
    image: "/placeholder.svg?height=300&width=400",
    color: "from-yellow-500 to-orange-500",
  },
]

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            World-Class
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Facilities
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience fitness like never before with our premium facilities designed to support every aspect of your
            health and wellness journey.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {facilities.map((facility, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute top-4 left-4 p-3 rounded-lg bg-gradient-to-r ${facility.color}`}>
                    <facility.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{facility.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{facility.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-white mb-3">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 hover:bg-white/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-white font-semibold mb-2">Access</div>
              <div className="text-gray-300">Train whenever it suits your schedule</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                15K
              </div>
              <div className="text-white font-semibold mb-2">Sq Ft</div>
              <div className="text-gray-300">Spacious facility with room to grow</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-white font-semibold mb-2">Clean</div>
              <div className="text-gray-300">Sanitized equipment and facilities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
