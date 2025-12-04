import type { Person } from "../../types/person"

const Persons = ({filteredPersons, filter, persons}: any) => {

  return (
    <ul>
        {
          filteredPersons.length === 0 
          ? ( filter === '' 
            ? persons.map((person: Person) => <li key={person.id}>{person.name}</li>)
            : <li>No results!</li> )
          : filteredPersons.map((person: Person) => <li key={person.id}>{person.name}</li>)
        }
      </ul>
  )
}

export default Persons