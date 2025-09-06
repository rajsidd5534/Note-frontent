import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CreateNote() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("You are not logged in");

      await API.post(
        "/notes", // make sure your axios baseURL includes /api if backend uses /api/notes
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Note created successfully");
      navigate("/notes");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create note: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Note</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
