import type { Note as NoteType } from '../types/Note'

const Note = ({ note, toggleImportanceOf, removeNote  }
              : {note: NoteType, toggleImportanceOf: any, removeNote: any}) => {

  const label = note.important
    ? 'Make not important.' : 'Make important'

  return <li style={{height: '2rem'}}>
    {note.content}
    <button onClick={removeNote} style={{float: 'right', marginLeft: '3px'}}>Delete</button>
    <button onClick={toggleImportanceOf} style={{float: 'right', width: '10rem'}}>{label}</button>
  </li>
}

export default Note