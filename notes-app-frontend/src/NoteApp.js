import React ,{useState,useEffect} from 'react';
import axios from 'axios';

const NotesApp = () =>{
    const[notes,setNotes] = useState([]);
    const[title,setTitle] = useState('');
    const[content,setContent] = useState('');

    useEffect(() =>{
        fetchNotes();
    },[])

    const fetchNotes = async() =>{
        const response = await axios.get('http://localhost:4001/notes')
        setNotes(response.data)
    }

    const createNote = async (e) =>{
        e.preventDefault();
        const newNote = {title,content}
        await axios.post('http://localhost:4001/notes',newNote)
        fetchNotes();
        setTitle('')
        setContent("")
    }

    const deleteNote = async(id) =>{
        await axios.delete(`http://localhost:4001/notes/${id}`)
        fetchNotes()
    }

    return(
        <div className='container'>
            <h1>NOTES APP</h1>
            <form onSubmit={createNote}>
                <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder='content' value={content} onChange={(e) => setContent(e.target.value)} />
                <button type='submit'> Add Note </button>
            </form>
            <ul>
                {notes.map((note) =>(
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <button onClick={() =>deleteNote(note.id)}>Delete</button>

                    </li>
                ))}
            </ul>

        </div>

    )
}

export default NotesApp;