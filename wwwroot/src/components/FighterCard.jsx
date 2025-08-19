import React from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, Ruler, Scale, Target, Shield, Zap, Activity } from 'lucide-react'

const FighterCard = ({ fighter }) => {
  const calculateAge = (birthday) => {
    if (!birthday) return 'N/A'
    const birthDate = new Date(birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const getWinPercentage = () => {
    const totalFights = fighter.wins + fighter.loss + fighter.draws
    if (totalFights === 0) return 0
    return Math.round((fighter.wins / totalFights) * 100)
  }

  const convertWeight = (weight) => {
    if (!weight) return 'N/A'
    
    // Convert to number and handle string values
    const numWeight = typeof weight === 'string' ? parseFloat(weight.trim()) : weight
    if (isNaN(numWeight)) return 'N/A'
    
    // Database stores weight in kg, convert to lbs
    const weightInLbs = numWeight * 2.20462
    return `${Math.round(weightInLbs)} lbs`
  }

  const formatHeight = (height) => {
    if (!height) return 'N/A'
    const numHeight = typeof height === 'string' ? parseFloat(height.trim()) : height
    if (isNaN(numHeight)) return 'N/A'
    
    // Database stores height in cm, convert to inches then to feet/inches
    const heightInInches = numHeight / 2.54
    const feet = Math.floor(heightInInches / 12)
    const inches = Math.round(heightInInches % 12)
    return `${feet}' ${inches}"`
  }

  const formatReach = (reach) => {
    if (!reach) return 'N/A'
    const numReach = typeof reach === 'string' ? parseFloat(reach.trim()) : reach
    if (isNaN(numReach)) return 'N/A'
    
    // Database stores reach in cm, convert to inches
    const reachInInches = numReach / 2.54
    return `${Math.round(reachInInches)}"`
  }

  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A'
    const numValue = typeof value === 'string' ? parseFloat(value.trim()) : value
    if (isNaN(numValue)) return 'N/A'
    return `${Math.round(numValue)}%`
  }

  const stats = [
    { label: 'Age', value: calculateAge(fighter.birthday), icon: Calendar },
    { label: 'Height', value: formatHeight(fighter.height), icon: Ruler },
    { label: 'Weight', value: convertWeight(fighter.weight), icon: Scale },
    { label: 'Reach', value: formatReach(fighter.reach), icon: Activity },
    { label: 'Stance', value: fighter.stance || 'N/A', icon: User },
  ]

  const combatStats = [
    { 
      label: 'Strike Accuracy', 
      value: formatPercentage(fighter.significantStrikeAccuracy), 
      icon: Target,
      color: 'text-orange-400'
    },
    { 
      label: 'Strike Defense', 
      value: formatPercentage(fighter.significantStrikeDefense), 
      icon: Shield,
      color: 'text-blue-400'
    },
    { 
      label: 'Takedown Accuracy', 
      value: formatPercentage(fighter.takedownAccuracy), 
      icon: Zap,
      color: 'text-green-400'
    },
    { 
      label: 'Takedown Defense', 
      value: formatPercentage(fighter.takedownDefense), 
      icon: Shield,
      color: 'text-purple-400'
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      {/* Fighter Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{fighter.name}</h3>
        {fighter.nickName && (
          <p className="text-gray-300 italic text-lg">"{fighter.nickName}"</p>
        )}
        
        {/* Record */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold text-green-400">{fighter.wins || 0}</div>
            <div className="text-xs text-green-300">WINS</div>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold text-red-400">{fighter.loss || 0}</div>
            <div className="text-xs text-red-300">LOSSES</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold text-yellow-400">{fighter.draws || 0}</div>
            <div className="text-xs text-yellow-300">DRAWS</div>
          </div>
        </div>
        
        {/* Win Percentage */}
        <div className="mt-4">
          <div className="text-sm text-gray-400 mb-1">Win Rate</div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getWinPercentage()}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
            />
          </div>
          <div className="text-lg font-bold text-green-400 mt-1">{getWinPercentage()}%</div>
        </div>
      </div>

      {/* Physical Stats */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-400" />
          Physical Stats
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-3 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <div className="text-white font-semibold">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Combat Stats */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-400" />
          Combat Stats
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {combatStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="bg-white/5 rounded-lg p-3 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <div className={`font-bold text-lg ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FighterCard