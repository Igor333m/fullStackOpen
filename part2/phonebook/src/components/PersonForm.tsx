const PersonForm = (props: any) => {

  return (
    <form onSubmit={props.nameUpdate}>
      Name: <input value={props.newName} onChange={props.handleNameChange} /> <br />
      Number: <input value={props.newNumber} onChange={props.handleNumberChange} /><br />
      <button type="submit">Add new name</button>
    </form>
  )
}

export default PersonForm