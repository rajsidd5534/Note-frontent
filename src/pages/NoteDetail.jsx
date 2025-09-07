import { useState } from "react";
import API from "../axios"; // Use your Axios instance

export default function NoteDetail({ note }) {
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShare = async () => {
    if (!note?.id) return;
    setLoading(true);
    setError("");

    try {
      const res = await API.post(`/notes/share/${note.id}`, {});
      setShareUrl(res.data.shareUrl);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to share note. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    alert("Share URL copied to clipboard!");
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "600px",
      margin: "20px auto",
      border: "1px solid #ccc",
      borderRadius: "8px"
    }}>
      <h2>{note.title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{note.content}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleShare} disabled={loading} style={{ marginRight: "10px" }}>
          {loading ? "Sharing..." : "Share Note"}
        </button>

        {shareUrl && (
          <>
            <input type="text" value={shareUrl} readOnly style={{ width: "70%" }} />
            <button onClick={handleCopy} style={{ marginLeft: "10px" }}>Copy</button>
          </>
        )}

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}
