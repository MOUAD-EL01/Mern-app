import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import UserSpace from "./pages/userSpace";
import AjouterUnOrder from "./pages/ajouterUnOrder";

export default function App() {
  return (
    <div className=" h-screen w-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ajouterUnOrder" element={<AjouterUnOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/espace-utilisateur" element={<UserSpace />} />
        </Routes>
      </Router>
    </div>
  );
}
