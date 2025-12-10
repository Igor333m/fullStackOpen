const FilteredListOfCountries = ({countryList, selectCountry}: any) => {

  return (
    <ul>
      {countryList.map( (country: any) => (
        <li key={country.ccn3}>
          {country.name.common}
          <button onClick={() => selectCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default FilteredListOfCountries