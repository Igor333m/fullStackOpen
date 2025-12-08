import { useState, useEffect } from 'react'
import type { Person, NewPerson } from '../types/person'
import personsService from './services/persons'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState('')

  const getAllPersons = async () => {
    setPersons(await personsService.getAll())
  }

  useEffect(() => {
    getAllPersons()
  }, [])

  const setPerson = async (person: NewPerson) => {
    try {
      await personsService.addNew(person)
      getAllPersons()
    } catch (error) {
      alert(error)
    }
  }

  const addNewPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(newName === '') return
    else if(nameSearch(newName) === undefined) {

      const newPerson: NewPerson = {
        name: newName,
        number: newNumber
      }
      setPerson(newPerson)
      resetForm()
    } 
    else {
      if(confirm(`${newName} is already added to phonebook! Replace the old number with a new one?`)) {
        setNewNumber(newNumber)

        const person = nameSearch(newName)
        if(person) {
          person.number = newNumber
          updatePerson(person)
        }
      }
    }
  }

  const updatePerson = async (person: Person) => {
    try {
      await personsService.update(person)
      getAllPersons()
      resetForm()
    } catch (error) {
      alert(error)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(e.target.value)
  }

  const nameSearch = (name: string): Person | undefined => {
    return persons.find(person => person.name.toLowerCase() === name.toLowerCase())
  }

  const resetFilter = () => {
    setFilter('')
    setFilteredPersons([])
  }  
  const resetForm = () => {
    setNewName('')
      setNewNumber('')
  }

  const setNewFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '') {
      resetFilter()
    }
    else {
    setFilter(e.target.value)
    let filteredList = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredPersons(filteredList) 
    }
  }

  const remove = async (person: Person) => {
    if(window.confirm(`Delete ${person.name}`)) {
      try {
        await personsService.remove(person.id)
        resetFilter()
        getAllPersons()
      } catch (error) {
        alert(error)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />

      <PersonForm nameUpdate={addNewPerson}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons}
                   filter={filter}
                   persons={persons}
                   remove={remove} />
    </div>
  )
}

export default App