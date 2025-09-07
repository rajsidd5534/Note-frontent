import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shareUrls, setShareUrls] = useState({});
  const [error, setError] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/notes"); // JWT attached automatically
      setNotes(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to fetch notes. Please login again.");
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

  // Share note
  const shareNote = async (id) => {
    try {
      const res = await API.post(`/notes/share/${id}`);
      setShareUrls((prev) => ({ ...prev, [id]: res.data.shareUrl }));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to share note.");
    }
  };

  // Copy share URL
  const copyShareUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert("Share URL copied to clipboard!");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading notes...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="notes-container" style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>My Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-card" style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px"
          }}>
            <h3>{note.title}</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <Link to={`/notes/${note.id}`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => deleteNote(note.id)}>Delete</button>

              <button onClick={() => shareNote(note.id)}>Share</button>
            </div>

            {shareUrls[note.id] && (
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={shareUrls[note.id]}
                  readOnly
                  style={{ flex: 1 }}
                />
                <button onClick={() => copyShareUrl(shareUrls[note.id])}>Copy</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
