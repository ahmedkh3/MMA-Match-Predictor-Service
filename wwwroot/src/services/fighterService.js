const API_BASE = '/api/fighters'

export const fighterService = {
  async getAllFighters() {
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching fighters:', error)
      throw error
    }
  },

  async getFighterById(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching fighter:', error)
      throw error
    }
  },

  async getFighterByName(name) {
    try {
      const response = await fetch(`${API_BASE}/Name?name=${encodeURIComponent(name)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching fighter by name:', error)
      throw error
    }
  },

  async predictWinner(fighter1Name, fighter2Name) {
    try {
      const response = await fetch(`${API_BASE}/PredictByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fighter1Name,
          fighter2Name
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error predicting winner:', error)
      throw error
    }
  }
}
