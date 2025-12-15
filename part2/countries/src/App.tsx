import { useState, useEffect } from 'react'
import './App.css'
import countriesService from './services/countries'
import FindCountry from './components/FindCountry'
import FilteredListOfCountries from './components/FilteredLIstOfCountries'
import SingleCountry from './components/SingleCountry'

function App() {
  const [countries, setCountries] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState<any[]>([])

  const getAllCountries = async () => {
    setCountries(await countriesService.getAll())
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  const resetFilter = () => {
    setFilter('')
    setFilteredCountries([])
  }

  const setNewFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '') {
      resetFilter()
    } else {
      setFilter(e.target.value)
      getFilteredCountries(e.target.value)
    }
  }

  const getFilteredCountries = (filter: string) => {
    const filtered = countries.filter( country => {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
    })
    setFilteredCountries(filtered)
  }

  const selectCountry = (country: any) => {
    setFilteredCountries([country])
  }

  return (
    <>
      <h2>Search Countries Database</h2>
      <FindCountry filter={filter} setNewFilter={setNewFilter} />

      { filteredCountries.length > 10 
        ? <p>Too many matches, narrow the search!</p>
        : filteredCountries.length === 1 
            ? <SingleCountry country={filteredCountries[0]} />
            : <FilteredListOfCountries countryList={filteredCountries} selectCountry={selectCountry}/>
        }
    </>
  )
}

export default App