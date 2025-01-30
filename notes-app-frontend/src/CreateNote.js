import React,{useState} from "react";
import './App.css'; 

const CreateNote =({onCreate}) =>{
    const[title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault()
        const newNote = {title,content}
        onCreate(newNote)
        setTitle("")
        setContent("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder='content' value={content} onChange={(e) => setContent(e.target.value)} />
                <button type='submit'> Add Note </button>
            </form>
            
        </div>
    )
    
}

export default CreateNote;