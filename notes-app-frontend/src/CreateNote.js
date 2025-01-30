import React, { useState } from "react";
import "./App.css";

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { title, content };
    onCreate(newNote);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <div className="create-note-container">
        {showForm ? (
          <form onSubmit={handleSubmit} className="note-form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="form-buttons">
              <button type="submit"> Add </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setShowForm(false)}
              >
                ✖ Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="add-button" onClick={() => setShowForm(true)}>
            ➕
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
