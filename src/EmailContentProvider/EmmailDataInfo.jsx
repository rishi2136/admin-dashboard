import React, { createContext } from "react";
import content from "./EmailData";

export const EmailContent = createContext(content);

function EmailDataInfo({ children }) {
  return (
    <EmailContent.Provider value={content}>
      {children}
    </EmailContent.Provider>
  );
}

export default EmailDataInfo;
