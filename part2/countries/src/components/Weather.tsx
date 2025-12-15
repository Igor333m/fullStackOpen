import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

interface WeatherData {
  weather?: Array<{ icon: string }>;
  main?: { temp: number };
  wind?: { speed: number };
}

const Weather = ({country}: any) => {

  const api_key = import.meta.env.VITE_WEATHER

  const [weather, setWeather] = useState<WeatherData>({} as WeatherData)
  const [icon, setIcon] = useState('')

  const getWeather = async () => {
    try {
      const data: WeatherData = await weatherService.get(country.latlng[0], country.latlng[1], api_key)
      setWeather(data)

      const iconCode = data?.weather?.[0]?.icon
      if (iconCode) {
        const iconUrl = await weatherService.getIcon(iconCode)
        if (typeof iconUrl === 'string') {
          setIcon(iconUrl)
        } else {
          setIcon('')
        }
      } else {
        setIcon('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getWeather()
  }, [country.lat])

  return (
    <section>
      <h3>Weather in {country.capital[0]}</h3>
      <p>Temperature {weather?.main?.temp} Celsius</p>
      {icon && <img src={icon} alt='Current weather icon' /> }
      <p>Wind {weather?.wind?.speed} m/s</p>
    </section>
  )
}

export default Weather