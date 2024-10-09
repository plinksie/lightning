import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { fetchLightningData } from '../lib/api'

export default function LightningLayer() {
  const map = useMap()
  const [lightningData, setLightningData] = useState<Array<{ lat: number; lon: number; intensity: number }>>([])

  useEffect(() => {
    fetchLightningData().then(setLightningData)
  }, [])

  useEffect(() => {
    const lightningIcon = L.divIcon({
      html: '<div class="lightning-strike"></div>',
      className: 'lightning-icon',
    })

    const lightningLayer = L.layerGroup()

    lightningData.forEach(({ lat, lon }) => {
      const marker = L.marker([lat, lon], { icon: lightningIcon })
      lightningLayer.addLayer(marker)
      setTimeout(() => lightningLayer.removeLayer(marker), 1000)
    })

    lightningLayer.addTo(map)

    return () => {
      map.removeLayer(lightningLayer)
    }
  }, [map, lightningData])

  return null
}