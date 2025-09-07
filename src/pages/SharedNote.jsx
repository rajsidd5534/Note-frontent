import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";  // use plain axios

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  console.log("Fetching shared note for:", shareId); // ✅ log here

  const fetchSharedNote = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://notes-backend-production.up.railway.app/api/notes/share/${shareId}`
      );
      console.log("Fetched note:", res.data); // ✅ log here
      setNote(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Shared note not found or has been removed.");
    } finally {
      setLoading(false);
    }
  };

  fetchSharedNote();
}, [shareId]);

  if (loading) return <p>Loading shared note...</p>;
  if (!note) return <p>Note not available.</p>;

  return (
    <div className="form-container">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
