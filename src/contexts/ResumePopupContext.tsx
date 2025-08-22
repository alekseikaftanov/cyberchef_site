'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResumePopupContextType {
  isResumePopupOpen: boolean;
  openResumePopup: () => void;
  closeResumePopup: () => void;
}

const ResumePopupContext = createContext<ResumePopupContextType | undefined>(undefined);

export const useResumePopup = () => {
  const context = useContext(ResumePopupContext);
  if (context === undefined) {
    throw new Error('useResumePopup must be used within a ResumePopupProvider');
  }
  return context;
};

interface ResumePopupProviderProps {
  children: ReactNode;
}

export const ResumePopupProvider: React.FC<ResumePopupProviderProps> = ({ children }) => {
  const [isResumePopupOpen, setIsResumePopupOpen] = useState(false);

  const openResumePopup = () => setIsResumePopupOpen(true);
  const closeResumePopup = () => setIsResumePopupOpen(false);

  return (
    <ResumePopupContext.Provider value={{ isResumePopupOpen, openResumePopup, closeResumePopup }}>
      {children}
    </ResumePopupContext.Provider>
  );
};
