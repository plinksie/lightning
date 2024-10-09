import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

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

  useEffect(() => {
    if (selectedLocation) {
      map.setView([selectedLocation.lat, selectedLocation.lon], 10)
    }
  }, [map, selectedLocation])

  useEffect(() => {
    // Implement logic for showing/hiding lightning layer
    if (showLightning) {
      // Add lightning layer
    } else {
      // Remove lightning layer
    }
  }, [showLightning])

  useEffect(() => {
    // Implement logic for showing/hiding aurora layer
    if (showAurora) {
      // Add aurora layer
    } else {
      // Remove aurora layer
    }
  }, [showAurora])

  useEffect(() => {
    // Implement logic for changing map type
    // This could involve changing the TileLayer URL or applying different styles
  }, [mapType, isDarkMode])

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

export default function Map({ isDarkMode, showLightning, showAurora, mapType, selectedLocation, onLocationSelect }: MapProps) {
  const mapCenter: [number, number] = selectedLocation ? [selectedLocation.lat, selectedLocation.lon] : [0, 0]
  const zoom = selectedLocation ? 10 : 3

  return (
    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
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