import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    if (window.confirm("Delete this note?")) {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    }
  };

  const shareNote = async (id) => {
    const res = await API.post(`/notes/share/${id}`);
    alert(`Share URL: ${res.data.shareUrl}`);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2>My Notes</h2>
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div>
            <Link to={`/notes/${note.id}`}>Edit</Link>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <button onClick={() => shareNote(note.id)}>Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}
