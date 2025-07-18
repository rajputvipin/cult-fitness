import React from 'react';
import { motion } from 'framer-motion';
import { facilities } from '../data/mockData';

const Facilities: React.FC = () => {
  const additionalFacilities = [
    {
      id: '5',
      name: 'Personal Training Studio',
      description: 'Private spaces for one-on-one training sessions',
      icon: '🏋️‍♀️',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '6',
      name: 'Recovery Zone',
      description: 'Massage chairs and recovery equipment',
      icon: '🛋️',
      image: 'https://images.pexels.com/photos/3757957/pexels-photo-3757957.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '7',
      name: 'Nutrition Center',
      description: 'Healthy meal prep and consultation area',
      icon: '🥗',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '8',
      name: 'Group Classes',
      description: 'Spacious studios for group fitness classes',
      icon: '👥',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  const allFacilities = [...facilities, ...additionalFacilities];

  return (
    <div className="bg-black min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Our Facilities
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              State-of-the-art equipment and premium facilities designed to help you achieve your fitness goals in comfort and style.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allFacilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 text-3xl bg-black/50 backdrop-blur-sm rounded-full p-2">
                    {facility.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {facility.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Premium <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Amenities</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience luxury and comfort with our premium amenities designed for your convenience.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🚿', title: 'Premium Showers', description: 'Luxury shower facilities with premium amenities' },
              { icon: '🔒', title: 'Secure Lockers', description: 'State-of-the-art security for your belongings' },
              { icon: '🅿️', title: 'Free Parking', description: 'Convenient parking space for all members' },
              { icon: '📱', title: 'Smart Technology', description: 'App-controlled equipment and booking system' },
              { icon: '🎧', title: 'Audio System', description: 'High-quality sound system throughout the facility' },
              { icon: '❄️', title: 'Climate Control', description: 'Optimal temperature and air quality maintained' }
            ].map((amenity, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{amenity.title}</h3>
                <p className="text-gray-300">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Operating Hours</h2>
            <p className="text-xl text-gray-300">We're here when you need us most</p>
          </motion.div>
          
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Weekdays</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-purple-400 font-semibold">5:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Personal Training</span>
                    <span className="text-purple-400 font-semibold">6:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Weekends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Saturday - Sunday</span>
                    <span className="text-purple-400 font-semibold">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Personal Training</span>
                    <span className="text-purple-400 font-semibold">7:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;