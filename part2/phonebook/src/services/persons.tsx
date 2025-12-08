import type { NewPerson, Person } from "../../types/person"

const baseUrl = 'http://localhost:3001/persons'

const getAll = async (): Promise<Person[]> => {
  return fetch(baseUrl)
      .then(res => res.json())
      .catch(err => console.error(err))
}

const addNew = async (person: NewPerson) => {
   try {
    await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })
  } catch(error) {
    console.error("Error:")
  }
}

const remove = async (id: string) => {
   try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })
  } catch(error) {
    console.error("Error:")
  }
}

const update = async (person: Person) => {
  try {
    await fetch(`${baseUrl}/${person.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })
  } catch(error) {
    console.error("Error:")
  }
}

export default {
  getAll,
  addNew,
  remove,
  update
}