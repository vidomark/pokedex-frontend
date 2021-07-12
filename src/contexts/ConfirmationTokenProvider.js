import React, { useState, useContext, createContext } from "react";

const ConfirmationTokenContext = createContext();
const SetConfirmationTokenContext = createContext();

export const useConfirmationToken = () => {
  return useContext(ConfirmationTokenContext);
};

export const useSetConfirmationToken = () => {
  return useContext(SetConfirmationTokenContext);
};

export default function ConfirmationTokenProvider({ children }) {
  const [confirmationToken, setConfirmationToken] = useState(null);

  return (
    <ConfirmationTokenContext.Provider value={confirmationToken}>
      <SetConfirmationTokenContext.Provider value={setConfirmationToken}>
        {children}
      </SetConfirmationTokenContext.Provider>
    </ConfirmationTokenContext.Provider>
  );
}
