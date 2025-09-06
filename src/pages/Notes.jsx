import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/notes"); // JWT attached automatically
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/login"); // redirect to login page
      } else {
        alert("Failed to fetch notes.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes(); // refresh notes list
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to delete note.");
      }
    }
  };

  // Share note
  const shareNote = async (id) => {
    try {
      const res = await API.post(`/notes/share/${id}`);
      alert(`Share URL: ${res.data.shareUrl}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to share note.");
      }
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
        notes.map((note) => {
          const noteId = note._id || note.id; // handle MongoDB _id
          return (
            <div key={noteId} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div>
                <Link to={`/notes/${noteId}`}>Edit</Link>
                <button onClick={() => deleteNote(noteId)}>Delete</button>
                <button onClick={() => shareNote(noteId)}>Share</button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
