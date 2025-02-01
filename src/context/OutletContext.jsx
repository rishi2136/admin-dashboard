// frontend/src/context/OutletContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const OutletContext = createContext(null);

// Provider component
export function OutletProvider({ children }) {
  const [outletInfo, setOutletInfo] = useState({
    name: "",
    resId: "",
    address: "",
  });

  // // Fetch once when the provider mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/outlet-info"
  //       );
  //       setOutletInfo(response.data);
  //     } catch (error) {
  //       console.error("Error fetching outlet info:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Provide outletInfo + optional setter
  return (
    <OutletContext.Provider value={{ outletInfo, setOutletInfo }}>
      {children}
    </OutletContext.Provider>
  );
}
