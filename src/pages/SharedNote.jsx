import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shareId) return;

    const fetchSharedNote = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get(`/notes/shared/${shareId}`);
        setNote(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Shared note not found or has been removed.");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [shareId]);

  if (loading) return <p>Loading shared note...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!note) return <p>No note available.</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>{note.title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>
    </div>
  );
}
