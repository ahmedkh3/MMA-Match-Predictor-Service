import React from 'react'
import { motion } from 'framer-motion'
import { Filter, Scale } from 'lucide-react'

const WeightClassFilter = ({ selectedWeightClass, onWeightClassChange }) => {
  const weightClasses = [
    { value: 'all', label: 'All Weight Classes', range: 'All Fighters' },
    { value: 'flyweight', label: 'Flyweight', range: '≤125 lbs' },
    { value: 'bantamweight', label: 'Bantamweight', range: '126-135 lbs' },
    { value: 'featherweight', label: 'Featherweight', range: '136-145 lbs' },
    { value: 'lightweight', label: 'Lightweight', range: '146-155 lbs' },
    { value: 'welterweight', label: 'Welterweight', range: '156-170 lbs' },
    { value: 'middleweight', label: 'Middleweight', range: '171-185 lbs' },
    { value: 'light-heavyweight', label: 'Light Heavyweight', range: '186-205 lbs' },
    { value: 'heavyweight', label: 'Heavyweight', range: '206+ lbs' },
  ]

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
      <div className="flex items-center gap-2 text-white">
        <Filter className="w-5 h-5 text-blue-400" />
        <span className="font-medium">Filter by Weight Class:</span>
      </div>
      
      <div className="relative">
        <select
          value={selectedWeightClass}
          onChange={(e) => onWeightClassChange(e.target.value)}
          className="appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 cursor-pointer min-w-[250px]"
        >
          {weightClasses.map((weightClass) => (
            <option 
              key={weightClass.value} 
              value={weightClass.value}
              className="bg-gray-800 text-white"
            >
              {weightClass.label} ({weightClass.range})
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Scale className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default WeightClassFilter
