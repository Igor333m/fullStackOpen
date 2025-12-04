import { useState, useEffect } from 'react'
import type { Person } from '../types/person'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/persons')
      .then(res => res.json())
      .then(json => setPersons(json))
      .catch(err => console.error(err));
  }, [])


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