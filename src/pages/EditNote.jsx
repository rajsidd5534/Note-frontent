import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/notes/${id}`); // JWT automatically attached
        setForm(res.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to fetch note. It may not exist or you are unauthorized.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/notes/${id}`, form);
      alert("Note updated successfully");
      navigate("/notes");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to update note.");
    }
  };

  if (loading) return <p>Loading note...</p>;

  return (
    <div className="form-container">
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
