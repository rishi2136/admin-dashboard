import React, { useState, useEffect } from "react";
import TiffinLeftPanel from "../components/TiffinComponets/TiffinLeftPanel";
import TiffinRightPanel from "../components/TiffinComponets/TiffinRightPanle/TiffinRightPanel";
import TopBar from "../components/TopBar";

<<<<<<< HEAD
export default function AddTiffin() {
=======
export default function AddTiffin({ email, setEmail, nextStep }) {
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
  const initialComponent =
    localStorage.getItem("selectedComponent") || "Manage-Tiffin";
  const [selectedComponet, setSelectedComponet] = useState(initialComponent);

  // Save the selected component whenever it changes
  useEffect(() => {
    if (selectedComponet) {
      localStorage.setItem("selectedComponent", selectedComponet);
    }
  }, [selectedComponet]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden ">
<<<<<<< HEAD
        <TiffinLeftPanel onselectComponet={setSelectedComponet} />
        <TiffinRightPanel selectedComponet={selectedComponet} />
=======
        <TiffinLeftPanel
          onselectComponet={setSelectedComponet}
          nextStep={nextStep}
        />
        <TiffinRightPanel
          selectedComponet={selectedComponet}
          email={email}
          setEmail={setEmail}
        />
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
      </div>
    </div>
  );
}
