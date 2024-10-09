import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { fetchLightningData, fetchAuroraData } from '../lib/api'

interface LocationData {
  name: string
  lat: number
  lon: number
}

interface MapProps {
  isDarkMode: boolean
  showLightning: boolean
  showAurora: boolean
  mapType: string
  selectedLocation: LocationData | null
  onLocationSelect: (location: LocationData) => void
}

function MapContent({ isDarkMode, showLightning, showAurora, mapType, selectedLocation, onLocationSelect }: MapProps) {
  const map = useMap()
  const [lightningData, setLightningData] = useState<any[]>([])
  const [auroraData, setAuroraData] = useState<any | null>(null)
  const lightningLayerRef = useRef<L.LayerGroup | null>(null)
  const auroraLayerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.lat, selectedLocation.lon], 10)
    }
  }, [map, selectedLocation])

  useEffect(() => {
    async function fetchData() {
      if (showLightning) {
        const data = await fetchLightningData()
        setLightningData(data)
      } else {
        setLightningData([])
      }
    }
    fetchData()
  }, [showLightning])

  useEffect(() => {
    async function fetchData() {
      if (showAurora) {
        const data = await fetchAuroraData()
        setAuroraData(data)
      } else {
        setAuroraData(null)
      }
    }
    fetchData()
  }, [showAurora])

  useEffect(() => {
    if (mapType === 'satellite') {
      map.addLayer(L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN))
    } else {
      map.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer)
        }
      })
      map.addLayer(L.tileLayer(isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      ))
    }
  }, [mapType, isDarkMode, map])

  useEffect(() => {
    if (lightningLayerRef.current) {
      map.removeLayer(lightningLayerRef.current)
    }
    if (auroraLayerRef.current) {
      map.removeLayer(auroraLayerRef.current)
    }

    const lightningLayer = L.layerGroup()
    lightningData.forEach((strike: any) => {
      const marker = L.circleMarker([strike.coord.lat, strike.coord.lon], {
        radius: 5,
        fillColor: 'yellow',
        color: 'orange',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.8
      })
      marker.bindPopup(`Lightning strike at ${strike.coord.lat}, ${strike.coord.lon}`)
      lightningLayer.addLayer(marker)

      // Add ripple effect
      const ripple = L.circleMarker([strike.coord.lat, strike.coord.lon], {
        radius: 0,
        fillColor: 'yellow',
        color: 'orange',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.3
      })
      lightningLayer.addLayer(ripple)
      const animate = () => {
        ripple.setRadius(ripple.getRadius() + 1)
        ripple.setStyle({ opacity: ripple.options.opacity - 0.01, fillOpacity: ripple.options.fillOpacity - 0.01 })
        if (ripple.options.opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          lightningLayer.removeLayer(ripple)
        }
      }
      animate()

      // Add dotted line
      const line = L.polyline([[strike.coord.lat, strike.coord.lon], [strike.coord.lat, strike.coord.lon]], {
        color: 'yellow',
        weight: 2,
        opacity: 0.8,
        dashArray: '5, 10'
      })
      lightningLayer.addLayer(line)
    })

    if (showLightning) {
      lightningLayer.addTo(map)
    }
    lightningLayerRef.current = lightningLayer

    const auroraLayer = L.layerGroup()
    if (auroraData) {
      const northAurora = L.circle([90, 0], {
        radius: auroraData.kp_index * 1000000,
        fillColor: getAuroraColor(auroraData.kp_index),
        color: 'transparent',
        fillOpacity: 0.3
      })
      const southAurora = L.circle([-90, 0], {
        radius: auroraData.kp_index * 1000000,
        fillColor: getAuroraColor(auroraData.kp_index),
        color: 'transparent',
        fillOpacity: 0.3
      })
      auroraLayer.addLayer(northAurora)
      auroraLayer.addLayer(southAurora)
    }

    if (showAurora) {
      auroraLayer.addTo(map)
    }
    auroraLayerRef.current = auroraLayer

  }, [lightningData, auroraData, showLightning, showAurora, map])

  useEffect(() => {
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      onLocationSelect({ name: 'Clicked Location', lat, lon: lng })
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
    }
  }, [map, onLocationSelect])

  return null
}

function getAuroraColor(kpIndex: number): string {
  if (kpIndex >= 7) return 'red'
  if (kpIndex >= 5) return 'yellow'
  return 'green'
}

export default function Map({ isDarkMode, showLightning, showAurora, mapType, selectedLocation, onLocationSelect }: MapProps) {
  const mapCenter: [number, number] = selectedLocation ? [selectedLocation.lat, selectedLocation.lon] : [0, 0]
  const zoom = selectedLocation ? 10 : 3

  return (
    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }} maxBounds={[[-90, -180], [90, 180]]} maxBoundsViscosity={1.0}>
      <TileLayer
        url={isDarkMode 
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        }
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapContent 
        isDarkMode={isDarkMode}
        showLightning={showLightning}
        showAurora={showAurora}
        mapType={mapType}
        selectedLocation={selectedLocation}
        onLocationSelect={onLocationSelect}
      />
      {selectedLocation && (
        <Marker 
          position={[selectedLocation.lat, selectedLocation.lon]}
          icon={L.divIcon({className: 'bg-blue-500 w-4 h-4 rounded-full border-2 border-white'})}
        >
          <Popup>{selectedLocation.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}