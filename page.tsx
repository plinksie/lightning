"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import Controls from "components/Controls";
import MoonPhase from "/components/MoonPhase";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLightning, setShowLightning] = useState(true);
  const [showAurora, setShowAurora] = useState(false);
  const [mapType, setMapType] = useState("standard");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  return (
    <Layout darkMode={darkMode}>
      <div className="flex flex-col h-screen">
        <h1 className="text-3xl font-bold text-center py-4">
          Electrical Storms Live - Earth
        </h1>
        <div className="flex-grow relative">
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
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
