import { useState, useEffect } from 'react'
import Note from './components/Note'

const App = () => {
  const [allNotes, setAllNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/notes')
      .then(res => res.json())
      .then(json => setAllNotes(json))
      .catch(err => console.error(err));
  },[])

  const notesToShow = showAll ?
                      allNotes :
                      allNotes.filter(item => item.important)

  const updateNote = (event: any) => {
    setNewNote(event.target.value)
  }

  const addNote = (event: any) => {
    event.preventDefault()
    const noteObject: Note = {
      content: newNote,
      id: allNotes.length + 1,
      important: Math.random() < 0.5,
    }

    setAllNotes(allNotes.concat(noteObject))
    setNewNote('')
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note: Note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote} style={{display: 'inline-block', marginRight: '10px'}}>
        <input value={newNote || ''}
          onChange={updateNote}
        />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'} notes!</button>
    </div>
  )
}

export default App