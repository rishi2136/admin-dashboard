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
<<<<<<< HEAD
import EmailDataInfo from "./EmailContentProvider/EmmailDataInfo";
=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <OutletProvider>
<<<<<<< HEAD
      <EmailDataInfo>
      <App />
      </EmailDataInfo>
        
      </OutletProvider>
    </BrowserRouter>

=======
        <App />
      </OutletProvider>
    </BrowserRouter>
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  </React.StrictMode>
);
     
