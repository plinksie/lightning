import { MoonPhase, Observer, Spherical } from 'astronomy-engine'

export function getMoonPhase(date: Date): string {
  const phase = MoonPhase(date)

  if (phase < 45) return 'New Moon'
  if (phase < 90) return 'Waxing Crescent'
  if (phase < 135) return 'First Quarter'
  if (phase < 180) return 'Waxing Gibbous'
  if (phase < 225) return 'Full Moon'
  if (phase < 270) return 'Waning Gibbous'
  if (phase < 315) return 'Last Quarter'
  return 'Waning Crescent'
}

export function getMoonPosition(date: Date, lat: number, lon: number): { azimuth: number, altitude: number } {
  const observer = new Observer(lat, lon, 0)
  const moonPos = Spherical.equator(Spherical.moon(date))
  const moonHor = Spherical.horizon(date, observer, moonPos.ra, moonPos.dec)
  return {
    azimuth: moonHor.azimuth,
    altitude: moonHor.altitude
  }
}