import React from "react";
import TopBar from "../utils/TopBar";

const EventList = () => {
  return (
    <div>
      <TopBar title={"Listed Restaurants"} />
      <div className="h-90">
        <h1>I am the main content</h1>
      </div>
    </div>
  );
};

export default EventList;
