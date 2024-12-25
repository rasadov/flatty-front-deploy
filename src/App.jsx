// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Appartment from "./pages/Appartment";
import { Agent } from "./pages/Agent";
import { Complex } from "./pages/Complex";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appartment" element={<Appartment />} />
          <Route path="/agent" element={<Agent />} />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/complex" element={<Complex />} />
      </Routes>
    </Router>
  );
}

export default App;
