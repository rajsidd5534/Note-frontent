import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    API.get(`/notes/share/${shareId}`).then((res) => setNote(res.data));
  }, [shareId]);

  if (!note) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
