import type { Person } from "../../types/person"

const PersonsList = ({filteredPersons, filter, persons, remove}: any) => {

  return (
    <ul>
        {
          filteredPersons.length === 0 
          ? ( filter === '' 
            ? persons.map((person: Person) => <li key={person.id}>{person.name} <button onClick={() => remove(person)}>Delete</button></li>)
            : <li>No results!</li> )
          : filteredPersons.map((person: Person) => 
            <li key={person.id}>{person.name} <button onClick={() => remove(person)}>Delete</button></li>)
        }
      </ul>
  )
}

export default PersonsList

