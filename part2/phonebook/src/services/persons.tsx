import type { NewPerson, Person } from "../types/person"

const baseUrl = 'http://localhost:3001/persons'

const getAll = async (): Promise<Person[]> => {
  return fetch(baseUrl)
      .then(res => res.json())
      .catch(err => console.error(err))
}

const addNew = async (person: NewPerson) => {
   try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch(error) {
    throw error
  }
}

const remove = async (id: string) => {
   try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch(error) {
    throw error
  }
}

const update = async (person: Person) => {
  try {
    const response = await fetch(`${baseUrl}/${person.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })

    if (!response.ok) {
      throw response.status
    }
  } catch(error) {
    throw error
  }
}

export default {
  getAll,
  addNew,
  remove,
  update
}