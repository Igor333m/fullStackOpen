import { useState } from 'react'
import type { Person } from '../types/person'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {


  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas', number: '39-44-9956', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const nameUpdate = (e: any) => {
    e.preventDefault()

    if(newName === '') return
    else if(!nameSearch(newName)) {
      const newPerson: Person = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }
      setPersons([...persons].concat(newPerson))
      setNewName('')
      setNewNumber('')
    } 
    else alert(`${newName} is already added to phonebook!`)
  }

  const handleNameChange = (e: any) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e: any) => {
    setNewNumber(e.target.value)
  }

  const nameSearch = (name: string): Person | undefined => {
    return persons.find(person => person.name.toLowerCase() === name.toLowerCase())
  }

  const setNewFilter = (e: any) => {
    if(e.target.value === '') {
      setFilter(e.target.value)
      setFilteredPersons([])
    }
    else {
    setFilter(e.target.value)
    let filteredList = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredPersons(filteredList) 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />

      <PersonForm nameUpdate={nameUpdate}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons ={filteredPersons} filter={filter} persons={persons} />
    </div>
  )
}

export default App