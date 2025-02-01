// ------------------------
// src/main.jsx
// ------------------------
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OutletProvider } from "./context/OutletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <OutletProvider>
        <App />
      </OutletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
     
