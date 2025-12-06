import { useState, useEffect } from 'react'
import type {Note as NoteType, NoteInput} from './types/Note'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const fetchNotes = async () => {
    const notes = await noteService.getAll()
    setAllNotes(notes)
  }

  useEffect(() => {
    fetchNotes()
  },[])

  const notesToShow = showAll ?
                      allNotes :
                      allNotes.filter(item => item.important)

  const addNewNote = async (newNote: NoteInput) => {
    try {
      await noteService.create(newNote)
      fetchNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const updateNoteText = (event: any) => {
    setNewNote(event.target.value)
  }

  const addNote = (event: any) => {
    event.preventDefault()
    const noteObject: NoteInput = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    addNewNote(noteObject)
    setNewNote('')
  }

  const updateNote = async (note: NoteType) => {
    try {
      await noteService.update(note)
      fetchNotes()
    } catch (error) {
      console.log(error)
    }
  }  
  
  const removeNote = async (note: NoteType) => {
    try {
      await noteService.remove(note)
      fetchNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleImportanceOf = (id: string) => {
    const findNote = notesToShow.find(note => note.id === id)
    findNote && updateNote(findNote)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note: NoteType) => (
          <Note key={note.id}
                note={note}
                toggleImportanceOf={ () => toggleImportanceOf(note.id) }
                removeNote={ () => removeNote(note) }
          />
        ))}
      </ul>
      <form onSubmit={addNote} style={{display: 'inline-block', marginRight: '10px'}}>
        <input value={newNote || ''}
          onChange={updateNoteText}
        />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'} notes!</button>
    </div>
  )
}

export default App