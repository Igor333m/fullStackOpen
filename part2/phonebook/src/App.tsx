import { useState, useEffect } from 'react'
import type { Person, NewPerson } from './types/person'
import type { Notification as NotificationType } from './types/notification'
import personsService from './services/persons'
import Notification from './components/Notification'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState<NotificationType>({
    message: '',
    type: ''
  })

  const getAllPersons = async () => {
    setPersons(await personsService.getAll())
  }

  useEffect(() => {
    getAllPersons()
  }, [])

  const setPerson = async (person: NewPerson) => {
    try {
      await personsService.addNew(person)
      setNotification({
        message: `${person.name} added!`,
        type: 'success'
      })
      resetForm()
      getAllPersons()
    } catch (error) {
      setNotification({
        message: `Something went wrong, try again!`,
        type: 'error'
      })
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
    } 
    else {
      if(confirm(`${newName} is already added to phonebook! Replace the old number with a new one?`)) {
        setNewNumber(newNumber)
        setNotification({
          message: `${newName} phone updated!`,
          type: 'success'
        })

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
      setNotification({
        message: `${person.name} updated!`,
        type: 'success'
      })
      getAllPersons()
      resetForm()
    } catch (error) {
      if(error === 404) {
        setNotification({
          message: `Information of ${person.name} has already been removed from the server!`,
          type: 'error'
        })
      } else setNotification({
        message: `Something went wrong, try again!`,
        type: 'error'
      })
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
        setNotification({
          message: `${person.name} deleted successfully!`,
          type: 'success'
        })
        resetFilter()
        getAllPersons()
      } catch (error) {
        setNotification({
          message: `Something went wrong, try again!`,
          type: 'error'
        })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification.message && <Notification notification={notification}></Notification>}

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