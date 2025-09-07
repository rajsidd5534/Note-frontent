import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Fetch all notes for logged-in user
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to fetch notes. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete note
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

  // Share note and generate share URL
  const shareNote = async (id) => {
    try {
      const res = await API.post(`/notes/share/${id}`);
      setShareUrl(res.data.shareUrl);
      navigator.clipboard.writeText(res.data.shareUrl);
      alert(`Share URL copied to clipboard:\n${res.data.shareUrl}`);
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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>My Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{note.title}</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
            <div style={{ marginTop: "10px" }}>
              <Link to={`/notes/${note.id}`} style={{ marginRight: "10px" }}>
                Edit
              </Link>
              <button onClick={() => deleteNote(note.id)} style={{ marginRight: "10px" }}>
                Delete
              </button>
              <button onClick={() => shareNote(note.id)}>Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
