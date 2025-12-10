import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({country}: any) => {

  const api_key = import.meta.env.VITE_WEATHER

  const [weather, setWeather] = useState({})
  const [icon, setIcon] = useState('')

  const getWeather = async () => {
    try {
      const data = await weatherService.get(country.latlng[0], country.latlng[1], api_key)
      setWeather(data)

      const iconCode = data?.weather?.[0]?.icon
      if (iconCode) {
        const iconUrl = await weatherService.getIcon(iconCode)
        setIcon(iconUrl)
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
      <img src={icon} alt='Current weather icon' />
      <p>Wind {weather?.wind?.speed} m/s</p>
    </section>
  )
}

export default Weather