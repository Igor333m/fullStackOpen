const FindCountry = ({filter, setNewFilter}: any) => {

  return (
    <section>
      <p>Find countries: </p>
      <input value={filter} onChange={setNewFilter} />
    </section>
  )
}

export default FindCountry