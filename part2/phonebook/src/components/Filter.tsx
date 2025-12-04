const Filter = ({filter, setNewFilter}: any) => {

  return (
    <>
      Filter by name: <input value={filter} onChange={setNewFilter}/>
    </>
  )
}

export default Filter