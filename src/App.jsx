import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PesertaPelatihan from "./components/pages/peserta.jsx";
import ParticipantSearch from "./components/pages/pesertab.jsx";
import TentangKami from "./components/pages/tentangKami.jsx";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div style={{ backgroundColor: "#F9F3EF", minHeight: "100vh", margin: 0, padding: 0 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<ParticipantSearch />} />
            <Route path="/peserta" element={<ParticipantSearch />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}