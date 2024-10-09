import axios from 'axios';
import { getMoonPhase, getMoonPosition } from './utils';

const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

export async function fetchLightningData() {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=-180,-90,180,90,10&appid=${OPENWEATHERMAP_API_KEY}`);
    return response.data.list.filter((item: any) => item.weather[0].main === 'Thunderstorm');
  } catch (error) {
    console.error('Error fetching lightning data:', error);
    return [];
  }
}

export async function fetchAuroraData() {
  // Mock data for aurora
  return {
    kp_index: Math.random() * 9,
    visibility: Math.random() > 0.5 ? 'high' : 'low'
  };
}

export async function fetchMoonData(date: Date, lat: number, lon: number) {
  const phase = getMoonPhase(date);
  const position = getMoonPosition(date, lat, lon);
  return { phase, position };
}

export async function searchCity(query: string) {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    if (response.data.length > 0) {
      const result = response.data[0];
      return { name: result.display_name, lat: parseFloat(result.lat), lon: parseFloat(result.lon) };
    }
    return null;
  } catch (error) {
    console.error('Error searching city:', error);
    throw error;
  }
}