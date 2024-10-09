// Import statements consolidated at the top
import { useState } from "react";
import dynamic from "next/dynamic";
import Controls from "../components/Controls";
import MoonPhase from "../components/MoonPhase";

// "use client" directive correctly placed at the top
"use client";

// Dynamic import for the Map component
const Map = dynamic(() => import("../components/Map").then((mod) => mod.default), { ssr: false });

// LocationData interface declared once
interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

// Single Home function declaration with merged content
function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLightning, setShowLightning] = useState(true);
  const [showAurora, setShowAurora] = useState(false);
  const [mapType, setMapType] = useState("standard");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
      <main className={`flex-grow relative ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
        <h1 className="text-3xl font-bold text-center py-4 font-sans">Electrical Storms Live - Earth</h1>
        <div className="h-[calc(100vh-4rem)] relative">
          <Map
            isDarkMode={darkMode}
            showLightning={showLightning}
            showAurora={showAurora}
            mapType={mapType}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
          <Controls
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showLightning={showLightning}
            setShowLightning={setShowLightning}
            showAurora={showAurora}
            setShowAurora={setShowAurora}
            mapType={mapType}
            setMapType={setMapType}
            onLocationSelect={handleLocationSelect}
          />
          {selectedLocation && (
            <MoonPhase
              selectedLocation={selectedLocation.name}
              lat={selectedLocation.lat}
              lon={selectedLocation.lon}
              isDarkMode={darkMode}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;