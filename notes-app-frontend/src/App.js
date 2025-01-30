import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchNotes from "./SearchNotes";
import CreateNote from "./CreateNote";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null); // Track which note is being edited

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:4001/notes");
    setNotes(response.data);
    setFilteredNotes(response.data);
  };

  const handleSearch = (searchTerm) => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  const createNote = async (newNote) => {
    await axios.post("http://localhost:4001/notes", newNote);
    fetchNotes(); // Fetch updated list after creating a new note
  };

  const editNote = async (id, updatedNote) => {
    await axios.put(`http://localhost:4001/notes/${id}`, updatedNote);
    setEditingNote(null); // Close the edit mode
    fetchNotes(); // Fetch updated list after editing
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:4001/notes/${id}`);
    fetchNotes(); // Fetch updated list after deleting a note
  };

  const handleEditClick = (note) => {
    setEditingNote(note); // Set the note to be edited
  };

  const handleCancelEdit = () => {
    setEditingNote(null); // Cancel editing and return to view mode
  };

  return (
    <div className="App">
      <h1>NOTES APP</h1>
      <SearchNotes onSearch={handleSearch} />
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id}>
            {editingNote && editingNote.id === note.id ? (
              // Edit mode: Show form to edit the note
              <div>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({
                      ...editingNote,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editingNote.content}
                  onChange={(e) =>
                    setEditingNote({
                      ...editingNote,
                      content: e.target.value,
                    })
                  }
                />
                <div className="button-group">
                  <button onClick={() => editNote(note.id, editingNote)}>
                    Save
                  </button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              // View mode: Show the note and buttons for Edit/Delete
              <div>
                <span>{note.title}</span>
                <button onClick={() => handleEditClick(note)}>Edit</button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <CreateNote onCreate={createNote} />
    </div>
  );
}

export default App;
