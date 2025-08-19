import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Zap, Loader2 } from 'lucide-react'

const PredictionButton = ({ onPredict, disabled, loading }) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onPredict}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden px-12 py-6 rounded-2xl font-bold text-xl
        transition-all duration-300 transform
        ${disabled || loading
          ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl hover:shadow-green-500/25 animate-pulse-glow'
        }
      `}
    >
      {/* Background Animation */}
      {!disabled && !loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>ANALYZING FIGHTERS...</span>
          </>
        ) : (
          <>
            <Trophy className="w-6 h-6" />
            <span>PREDICT WINNER</span>
            <Zap className="w-6 h-6" />
          </>
        )}
      </div>
      
      {/* Glow Effect */}
      {!disabled && !loading && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.4)',
              '0 0 40px rgba(34, 197, 94, 0.6)',
              '0 0 20px rgba(34, 197, 94, 0.4)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}

export default PredictionButton
