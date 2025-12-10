const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async (): Promise<object[]> => {
  return fetch(`${baseUrl}/all`)
      .then(res => res.json())
      .catch(err => console.error(err))
}

const getCountry = async (country: string): Promise<object[]> => {
  return fetch(`${baseUrl}/name/${country}`)
      .then(res => res.json())
      .catch(err => console.error(err))
}

export default {
  getAll,
  getCountry
}