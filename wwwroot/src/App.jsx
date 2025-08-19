import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, RotateCcw, Trophy, Users, Zap, Target } from 'lucide-react'
import FighterSearch from './components/FighterSearch'
import FighterCard from './components/FighterCard'
import WeightClassFilter from './components/WeightClassFilter'
import PredictionButton from './components/PredictionButton'
import WinnerDisplay from './components/WinnerDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import { fighterService } from './services/fighterService'

function App() {
  const [fighters, setFighters] = useState([])
  const [filteredFighters, setFilteredFighters] = useState([])
  const [selectedFighters, setSelectedFighters] = useState({ fighter1: null, fighter2: null })
  const [selectedWeightClass, setSelectedWeightClass] = useState('all')
  const [winner, setWinner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [predicting, setPredicting] = useState(false)

  useEffect(() => {
    loadFighters()
  }, [])

  useEffect(() => {
    filterFightersByWeight()
  }, [fighters, selectedWeightClass])

  const loadFighters = async () => {
    try {
      setLoading(true)
      const data = await fighterService.getAllFighters()
      setFighters(data)
    } catch (error) {
      console.error('Error loading fighters:', error)
    } finally {
      setLoading(false)
    }
  }

  const convertWeightToLbs = (weight) => {
    if (!weight) return 0
    // Convert to number and handle string values
    const numWeight = typeof weight === 'string' ? parseFloat(weight.trim()) : weight
    if (isNaN(numWeight)) return 0
    // If weight is likely in kg (less than 100), convert to lbs
    return numWeight < 100 ? Math.round(numWeight * 2.20462) : Math.round(numWeight)
  }

  const filterFightersByWeight = () => {
    if (selectedWeightClass === 'all') {
      setFilteredFighters(fighters)
    } else {
      const filtered = fighters.filter(fighter => {
        const weightInLbs = convertWeightToLbs(fighter.weight)
        if (!weightInLbs) return false
        
        switch (selectedWeightClass) {
          case 'flyweight': return weightInLbs <= 125
          case 'bantamweight': return weightInLbs > 125 && weightInLbs <= 135
          case 'featherweight': return weightInLbs > 135 && weightInLbs <= 145
          case 'lightweight': return weightInLbs > 145 && weightInLbs <= 155
          case 'welterweight': return weightInLbs > 155 && weightInLbs <= 170
          case 'middleweight': return weightInLbs > 170 && weightInLbs <= 185
          case 'light-heavyweight': return weightInLbs > 185 && weightInLbs <= 205
          case 'heavyweight': return weightInLbs > 205
          default: return true
        }
      })
      setFilteredFighters(filtered)
    }
  }

  const handleFighterSelect = (fighter, position) => {
    setSelectedFighters(prev => ({
      ...prev,
      [position]: fighter
    }))
    setWinner(null)
  }

  const handleReset = () => {
    setSelectedFighters({ fighter1: null, fighter2: null })
    setSelectedWeightClass('all')
    setWinner(null)
  }

  const handlePredict = async () => {
    if (!selectedFighters.fighter1 || !selectedFighters.fighter2) return

    try {
      setPredicting(true)
      const result = await fighterService.predictWinner(
        selectedFighters.fighter1.name,
        selectedFighters.fighter2.name
      )
      setWinner(result.winner)
    } catch (error) {
      console.error('Error predicting winner:', error)
    } finally {
      setPredicting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MMA Match Predictor
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Advanced analytics and machine learning to predict MMA fight outcomes
            </motion.p>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 pb-12">
        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <WeightClassFilter 
                selectedWeightClass={selectedWeightClass}
                onWeightClassChange={setSelectedWeightClass}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Fighter Selection */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Fighter 1</h2>
              </div>
              
              <FighterSearch
                fighters={filteredFighters}
                onSelect={(fighter) => handleFighterSelect(fighter, 'fighter1')}
                placeholder="Search for first fighter..."
                selectedFighter={selectedFighters.fighter1}
                weightClass={selectedWeightClass}
              />
              
              <AnimatePresence>
                {selectedFighters.fighter1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6"
                  >
                    <FighterCard fighter={selectedFighters.fighter1} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Fighter 2</h2>
              </div>
              
              <FighterSearch
                fighters={filteredFighters}
                onSelect={(fighter) => handleFighterSelect(fighter, 'fighter2')}
                placeholder="Search for second fighter..."
                selectedFighter={selectedFighters.fighter2}
                weightClass={selectedWeightClass}
              />
              
              <AnimatePresence>
                {selectedFighters.fighter2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6"
                  >
                    <FighterCard fighter={selectedFighters.fighter2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Prediction Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mb-8 mt-16"
        >
          <PredictionButton
            onPredict={handlePredict}
            disabled={!selectedFighters.fighter1 || !selectedFighters.fighter2}
            loading={predicting}
          />
        </motion.div>

        {/* Winner Display */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <WinnerDisplay winner={winner} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
