import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Zap } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className="relative mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full" />
        <motion.div
          className="absolute inset-2 border-2 border-purple-500/30 border-b-purple-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Loading Fighters
        </h3>
        <p className="text-gray-300">Preparing the ultimate fight predictor...</p>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
