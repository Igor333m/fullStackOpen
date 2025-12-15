import Weather from './Weather'

const SingleCountry = ({country}: any) => {


  const languages = Object.values(country.languages)

  return (
    <section>
      <h2>{ country.name.common }</h2>

      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>

      <h3>Languages</h3>
      <ul>
        { languages.map( (value: any, i: any) => <li key={i}>{value}</li>) }
      </ul>
      <img src={country.flags.svg}
           alt={country.flags.alt}
           className="flags"
           title={country.flags.alt}
      />
      <Weather country={country}/>
    </section>
  )
}

export default SingleCountry