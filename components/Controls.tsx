import { useState } from 'react'
import { searchCity } from '../lib/api'

interface ControlsProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  showLightning: boolean
  setShowLightning: (showLightning: boolean) => void
  showAurora: boolean
  setShowAurora: (showAurora: boolean) => void
  mapType: string
  setMapType: (mapType: string) => void
  onLocationSelect: (location: { name: string; lat: number; lon: number }) => void
}

export default function Controls({
  darkMode,
  setDarkMode,
  showLightning,
  setShowLightning,
  showAurora,
  setShowAurora,
  mapType,
  setMapType,
  onLocationSelect
}: ControlsProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await searchCity(searchQuery)
      if (result) {
        onLocationSelect(result)
      }
    } catch (error) {
      console.error('Error searching for city:', error)
    }
  }

  return (
    <div className={`absolute top-4 right-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-4 rounded-lg shadow-lg`}>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => 
setSearchQuery(e.target.value)}
          placeholder="Search for a city"
          className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
        />
        <button type="submit" className={`mt-2 w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded`}>Search</button>
      </form>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="mr-2"
          />
          Dark Mode
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showLightning}
            onChange={(e) => setShowLightning(e.target.checked)}
            className="mr-2"
          />
          Show Lightning
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showAurora}
            onChange={(e) => setShowAurora(e.target.checked)}
            className="mr-2"
          />
          Show Aurora
        </label>
        <select
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
        >
          <option value="standard">Standard</option>
          <option value="satellite">Satellite</option>
        </select>
      </div>
    </div>
  )
}