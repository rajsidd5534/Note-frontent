import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shareId) return;

    let isMounted = true;

    const fetchSharedNote = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://notes-backend-production.up.railway.app/api/notes/share/${shareId}`
        );
        if (isMounted) setNote(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        if (isMounted) setError("Shared note not found or has been removed.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSharedNote();

    return () => { isMounted = false; };
  }, [shareId]);

  if (loading) return <p>Loading shared note...</p>;
  if (error) return <p>{error}</p>;
  if (!note) return <p>Note not available.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{note.title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
    </div>
  );
}
