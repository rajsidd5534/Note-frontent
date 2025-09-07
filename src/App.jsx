import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import SharedNote from "./pages/SharedNote";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/notes/:id" element={<EditNote />} />
       <Route path="/shared/:shareId" element={<SharedNote />} />
      </Routes>
    </BrowserRouter>
  );
}
