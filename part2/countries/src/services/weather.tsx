const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const iconUrl =  (code: string) => `https://openweathermap.org/img/wn/${code}@2x.png`

const get = async (lat: any, lon: any, apiKey: any): Promise<object> => {
  return fetch(`${baseUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .catch(err => console.error(err))
}

const getIcon = async (code: string) => {
  return fetch(iconUrl(code))
      .then(res => {
        return res.url
      })
      .catch(err => console.error(err))
}

export default {
  get,
  getIcon
}