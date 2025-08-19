import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Zap, Star } from 'lucide-react'

const WinnerDisplay = ({ winner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.2 
      }}
      className="relative"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl" />
      
      <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-4 left-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 text-yellow-400/30" />
          </motion.div>
        </div>
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-6 h-6 text-orange-400/30" />
          </motion.div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown className="w-8 h-8 text-yellow-400/20" />
          </motion.div>
        </div>

        {/* Winner Content */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-2 uppercase tracking-wide">
            🏆 Forecasted Winner
          </h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text mb-4 uppercase tracking-wider">
              {winner}
            </h1>
            
            {/* Text Glow Effect */}
            <motion.div
              className="absolute inset-0 text-5xl md:text-6xl font-black text-yellow-400/20 uppercase tracking-wider blur-sm"
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {winner}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-lg text-gray-300 font-medium"
          >
            Based on advanced statistical analysis and fight metrics
          </motion.p>
        </motion.div>

        {/* Celebration Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default WinnerDisplay
