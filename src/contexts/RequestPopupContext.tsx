'use client';

import React, { createContext, useContext, useState } from 'react';
import { RequestPopup } from '@/components/organisms/RequestPopup';

interface RequestPopupContextType {
  openRequestPopup: () => void;
}

const RequestPopupContext = createContext<RequestPopupContextType | null>(null);

export const useRequestPopup = () => {
  const context = useContext(RequestPopupContext);
  if (!context) {
    throw new Error('useRequestPopup must be used within RequestPopupProvider');
  }
  return context;
};

interface RequestPopupProviderProps {
  children: React.ReactNode;
}

export const RequestPopupProvider: React.FC<RequestPopupProviderProps> = ({ children }) => {
  const [isRequestPopupOpen, setIsRequestPopupOpen] = useState(false);

  const openRequestPopup = () => {
    setIsRequestPopupOpen(true);
  };

  const closeRequestPopup = () => {
    setIsRequestPopupOpen(false);
  };

  return (
    <RequestPopupContext.Provider value={{ openRequestPopup }}>
      {children}
      
      {/* Global Request Popup */}
      <RequestPopup open={isRequestPopupOpen} onClose={closeRequestPopup} />
    </RequestPopupContext.Provider>
  );
};
