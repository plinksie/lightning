import { getMoonPhase, getMoonPosition } from './utils'

interface LightningData {
  lat: number
  lon: number
  intensity: number
}

interface AuroraData {
  lat: number
  lon: number
  intensity: number
}

interface CityData {
  name: string
  lat: number
  lon: number
}

const cities: Record<string, CityData> = {
  'new york': { name: 'New York', lat: 40.7128, lon: -74.0060 },
  'london': { name: 'London', lat: 51.5074, lon: -0.1278 },
  'tokyo': { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
}

export async function fetchLightningData(): Promise<LightningData[]> {
  // Simulated API call for lightning data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { lat: 40.7128, lon: -74.0060, intensity: 0.8 },
        { lat: 51.5074, lon: -0.1278, intensity: 0.6 },
        { lat: 35.6762, lon: 139.6503, intensity: 0.9 },
      ])
    }, 1000)
  })
}

export async function fetchAuroraData(): Promise<AuroraData[]> {
  // Simulated API call for aurora data (both North and South poles)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { lat: 64.2008, lon: -149.4937, intensity: 0.7 },
        { lat: 69.6492, lon: 18.9553, intensity: 0.8 },
        { lat: -77.8463, lon: 166.6863, intensity: 0.6 },
        { lat: -72.0000, lon: -70.0000, intensity: 0.5 },
      ])
    }, 1000)
  })
}

export async function fetchMoonData(date: Date, lat: number, lon: number) {
  const phase = getMoonPhase(date)
  const position = getMoonPosition(date, lat, lon)
  return { phase, position }
}

export async function searchCity(query: string): Promise<CityData> {
  // Simulated API call for city search
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = cities[query.toLowerCase()]
      if (result) {
        resolve(result)
      } else {
        reject(new Error('City not found'))
      }
    }, 500)
  })
}

export async function fetchAuroraForecast(lat: number, lon: number): Promise<number> {
  // Simulated API call for aurora forecast
  return new Promise((resolve) => {
    setTimeout(() => {
      // Use lat and lon to simulate a more realistic forecast
      const baseIntensity = Math.random()
      const latitudeEffect = Math.abs(lat) / 90 // Higher intensity near poles
      const intensity = baseIntensity * latitudeEffect
      resolve(intensity)
    }, 800)
  })
}