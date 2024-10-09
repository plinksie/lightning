import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { fetchAuroraData } from '../lib/api'

export default function AuroraLayer() {
  const map = useMap()
  const [auroraData, setAuroraData] = useState<Array<{ lat: number; lon: number; intensity: number }>>([])

  useEffect(() => {
    fetchAuroraData().then(setAuroraData)
  }, [])

  useEffect(() => {
    const auroraLayer = L.layerGroup()

    auroraData.forEach(({ lat, lon, intensity }) => {
      const color = intensity > 0.7 ? 'red' : intensity > 0.5 ? 'yellow' : 'green'
      const circle = L.circle([lat, lon], {
        radius: 500000,
        color: color,
        fillColor: color,
        fillOpacity: 0.3,
      })
      auroraLayer.addLayer(circle)
    })

    auroraLayer.addTo(map)

    return () => {
      map.removeLayer(auroraLayer)
    }
  }, [map, auroraData])

  return null
}