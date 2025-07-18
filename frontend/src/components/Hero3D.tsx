import React from 'react';
import { motion } from 'framer-motion';

const Hero3D: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 z-0"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center pt-16 px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          CULT FITNESS
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Unleash your potential with personalized training, nutrition, and a community that motivates you to be your best self.
        </motion.p>
      </div>

      {/* 3D Animated Cards */}
      <div className="relative z-10 flex justify-center items-center flex-1 min-5-[400px]">
        <div className="relative perspective-1000">
          {/* Main Rotating Card */}
          <motion.div
            className="relative w-80 h-96 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl"></div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
              <motion.div
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💪
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Muscle Up
              </h3>
              
            </div>
          </motion.div>

          {/* Side Floating Cards */}
          <motion.div
            className="absolute -left-40 top-20 w-32 h-40 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-xl rounded-xl border border-gray-700/30"
            animate={{ rotateX: [0, 15, 0], rotateY: [0, -15, 0], z: [0, 50, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="p-4 text-center">
              <div className="text-3xl mb-2">🏋️‍♂️</div>
              <p className="text-white text-xs">Strength</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-40 top-20 w-32 h-40 bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-xl rounded-xl border border-gray-700/30"
            animate={{ rotateX: [0, -15, 0], rotateY: [0, 15, 0], z: [0, -50, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="p-4 text-center">
              <div className="text-3xl mb-2">🧘‍♀️</div>
              <p className="text-white text-xs">Wellness</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div>
        <h3 className='text-purple-300 text-center relative mt-4 text-lg'>
            Transform Your Body
        </h3>
        <p className="text-white relative justify-center text-center pb-4 mb-8">
            Join thousands of fitness enthusiasts on their journey to greatness
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 text-center pb-12 px-4 mt-4">
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
          <motion.button
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero3D;
