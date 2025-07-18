import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero3D from "../components/Hero3D";

const Home: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      title: "Personalized Training",
      description:
        "Get custom workout plans tailored to your fitness level and goals.",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: "🥗",
      title: "Nutrition Guidance",
      description:
        "Receive personalized diet plans to fuel your fitness journey.",
      color: "from-green-500 to-green-700",
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description:
        "Monitor your progress with detailed analytics and insights.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: "👥",
      title: "Community Support",
      description: "Join a community of like-minded fitness enthusiasts.",
      color: "from-orange-500 to-orange-700",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content:
        "Cult Fitness transformed my life. The personalized approach made all the difference.",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      name: "Mike Chen",
      role: "Professional Athlete",
      content:
        "The training programs are top-notch. I achieved my fitness goals faster than ever.",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
    {
      name: "Emily Davis",
      role: "Busy Professional",
      content:
        "Perfect for my busy schedule. The flexibility and support are amazing.",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="bg-black">
      <div>
        <Hero3D />
      </div>

      {/* Features Section */}
      <div>
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Cult Fitness?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We provide everything you need to transform your body and mind
                with cutting-edge technology and expert guidance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                What Our{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Members Say
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Life?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of members who have already started their fitness
                journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/facilities"
                  className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  Explore Facilities
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
