import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Contact from "./Contact";
import AddUser from "./AddUser";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactForm" element={<App />} />
        <Route path="/add_user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
