import React, { useState, useEffect } from "react";
import TiffinLeftPanel from "../components/TiffinComponets/TiffinLeftPanel";
import TiffinRightPanel from "../components/TiffinComponets/TiffinRightPanle/TiffinRightPanel";
import TopBar from "../components/TopBar";

export default function AddTiffin() {
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
        <TiffinLeftPanel onselectComponet={setSelectedComponet} />
        <TiffinRightPanel selectedComponet={selectedComponet} />
      </div>
    </div>
  );
}
