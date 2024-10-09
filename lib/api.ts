import axios from 'axios';
import { getMoonPhase, getMoonPosition } from './utils';

const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const AURORA_API_KEY = process.env.NEXT_PUBLIC_AURORA_API_KEY;

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
  try {
    const response = await axios.get(`https://api.auroras.live/v1/?type=all&lat=60&long=0&api_key=${AURORA_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching aurora data:', error);
    return null;
  }
}

export async function fetchMoonData(date: Date, lat: number, lon: number) {
  const phase = getMoonPhase(date);
  const position = getMoonPosition(date, lat, lon);
  return { phase, position };
}

export async function searchCity(query: string) {
  try {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);
    const features = response.data.features;
    if (features.length > 0) {
      const [lon, lat] = features[0].center;
      return { name: features[0].place_name, lat, lon };
    }
    return null;
  } catch (error) {
    console.error('Error searching city:', error);
    throw error;
  }
}