interface Note {
  content: string
  id: number
  important: boolean
}

const Note = ({ note }: {note: Note}) => {
  return <li>{note.content}</li>
}

export default Note