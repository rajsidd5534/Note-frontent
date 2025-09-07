import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/notes"); // JWT attached automatically
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to fetch notes. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to delete note.");
    }
  };

  const shareNote = async (id) => {
    try {
      const res = await API.post(`/notes/share/${id}`);
      alert(`Share URL: ${res.data.shareUrl}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to share note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="notes-container">
      <h2>My Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div>
              <Link to={`/notes/${note.id}`}>Edit</Link>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
              <button onClick={() => shareNote(note.id)}>Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
