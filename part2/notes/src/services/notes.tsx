import type {Note as NoteType, NoteInput} from '../types/Note'

const baseUrl = 'http://localhost:3001/notes/'

const getAll = async (): Promise<NoteType[]> => {
  return fetch('http://localhost:3001/notes/')
      .then(res => res.json())
      .catch(err => console.error(err))
}

const create = async (newNote: NoteInput) => {
  try {
    return await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
  } catch(error) {
    console.error("Error:", error)
  }
}

const update = async (note: NoteType) => {
  try {
    return await fetch(`${baseUrl}${note.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        important: !note.important
      })
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

const remove = async (note: NoteType) => {
  try {
    return await fetch(`${baseUrl}${note.id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

export default { 
  getAll, 
  create, 
  update,
  remove
}