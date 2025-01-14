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
import ListingsPage from "./components/sections/ListingsPage";
import Wishlist from "./pages/Wishlist";
import MapView from "./pages/MapView";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appartment/:id" element={<Appartment />} />
          <Route path="/agent" element={<Agent />} />
          <Route path="/listingspage" element={<ListingsPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/complex/:id" element={<Complex />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
