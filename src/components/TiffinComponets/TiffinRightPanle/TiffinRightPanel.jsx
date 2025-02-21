import React from "react";
import RenderSelectedComponet from "../RenderSelectedComponet";


const TiffinRightPanel = ({ selectedComponet }) => {
    return (
        <div className="w-full bg-white p-4 overflow-y-auto custom-scrollbar">
            <RenderSelectedComponet
                SelectedComponet={selectedComponet}
            />
        </div>
    );
};

export default TiffinRightPanel;

