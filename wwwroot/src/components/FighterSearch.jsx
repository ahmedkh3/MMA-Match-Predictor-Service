import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

const FighterSearch = ({ fighters, onSelect, placeholder, selectedFighter, weightClass }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [filteredFighters, setFilteredFighters] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (selectedFighter) {
      setQuery(selectedFighter.name)
    }
  }, [selectedFighter])

  const getWeightClassFighters = (allFighters, weightClass) => {
    if (weightClass === 'all') return allFighters
    
    return allFighters.filter(fighter => {
      const weight = fighter.weight
      if (!weight) return false
      
      // Convert kg to lbs if needed
      const numWeight = typeof weight === 'string' ? parseFloat(weight.trim()) : weight
      if (isNaN(numWeight)) return false
      const weightInLbs = numWeight < 100 ? Math.round(numWeight * 2.20462) : Math.round(numWeight)
      
      switch (weightClass) {
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
  }

  useEffect(() => {
    if (query.length > 0) {
      // First filter by weight class, then by search query
      const weightFilteredFighters = getWeightClassFighters(fighters, weightClass)
      
      const filtered = weightFilteredFighters.filter(fighter =>
        fighter.name.toLowerCase().includes(query.toLowerCase()) ||
        (fighter.nickName && fighter.nickName.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
      
      setFilteredFighters(filtered)
      setIsOpen(filtered.length > 0)
      setHighlightedIndex(-1)
    } else {
      setFilteredFighters([])
      setIsOpen(false)
    }
  }, [query, fighters, weightClass])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleFighterSelect = (fighter) => {
    setQuery(fighter.name)
    setIsOpen(false)
    onSelect(fighter)
  }

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
    onSelect(null)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredFighters.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredFighters.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredFighters[highlightedIndex]) {
          handleFighterSelect(filteredFighters[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
        if (query) {
          const weightFilteredFighters = getWeightClassFighters(fighters, weightClass)
          const filtered = weightFilteredFighters.filter(fighter =>
            fighter.name.toLowerCase().includes(query.toLowerCase()) ||
            (fighter.nickName && fighter.nickName.toLowerCase().includes(query.toLowerCase()))
          ).slice(0, 8)
          setFilteredFighters(filtered)
          setIsOpen(filtered.length > 0)
        }
      }}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredFighters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[9999] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto"
          >
            {filteredFighters.map((fighter, index) => (
              <motion.div
                key={fighter.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleFighterSelect(fighter)}
                className={`px-4 py-3 cursor-pointer border-b border-gray-200/50 last:border-b-0 transition-all duration-150 ${
                  index === highlightedIndex 
                    ? 'bg-blue-50 text-blue-900' 
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{fighter.name}</div>
                    {fighter.nickName && (
                      <div className="text-sm text-gray-600 italic">"{fighter.nickName}"</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">
                      {fighter.wins}W-{fighter.loss}L-{fighter.draws}D
                    </div>
                    {fighter.weight && (
                      <div className="text-xs text-gray-500">
                        {(() => {
                          const numWeight = typeof fighter.weight === 'string' ? parseFloat(fighter.weight.trim()) : fighter.weight
                          if (isNaN(numWeight)) return 'N/A'
                          return numWeight < 100 ? `${Math.round(numWeight * 2.20462)} lbs` : `${Math.round(numWeight)} lbs`
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FighterSearch
