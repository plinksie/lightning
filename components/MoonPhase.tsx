import { useState, useEffect } from "react";
import { fetchMoonData } from "../lib/api";

interface MoonPhaseProps {
  selectedLocation: string;
  lat: number;
  lon: number;
  isDarkMode: boolean;
}

export default function MoonPhase({
  selectedLocation,
  lat,
  lon,
  isDarkMode,
}: MoonPhaseProps) {
  const [moonData, setMoonData] = useState<{
    phase: string;
    position: { azimuth: number; altitude: number };
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (selectedLocation) {
        const data = await fetchMoonData(new Date(), lat, lon);
        setMoonData(data);
      }
    }
    fetchData();
  }, [selectedLocation, lat, lon]);

  if (!selectedLocation || !moonData) return null;

  return (
    <div
      className={`absolute bottom-4 left-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } p-4 rounded-lg shadow-lg`}
    >
      <h2 className="text-lg font-semibold mb-2">
        Moon for {selectedLocation}
      </h2>
      <p>Phase: {moonData.phase}</p>
      <p>Azimuth: {moonData.position.azimuth.toFixed(2)}°</p>
      <p>Altitude: {moonData.position.altitude.toFixed(2)}°</p>
    </div>
  );
}
