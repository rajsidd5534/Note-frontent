import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      if (err.response?.status === 403) navigate("/login"); // token missing/expired
      else alert("Failed to fetch notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>My Notes</h2>
      {notes.map((note) => (
        <div key={note._id || note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <Link to={`/notes/${note._id || note.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
}
