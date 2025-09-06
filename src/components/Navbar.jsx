import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>NotesApp</h2>
      <div>
        {token ? (
          <>
            <Link to="/notes">My Notes</Link>
            <Link to="/create">Create</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
