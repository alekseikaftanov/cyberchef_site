'use client';

import { useState } from 'react';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { RequestPopupProvider } from '@/contexts/RequestPopupContext';
import { ResumePopupProvider } from '@/contexts/ResumePopupContext';
import { ResumePopup } from './ResumePopup';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <RequestPopupProvider>
      <ResumePopupProvider>
        {/* Global Sticky Header */}
        <Header onMenuToggle={setIsMobileMenuOpen} isMenuOpen={isMobileMenuOpen} />
        
        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        
        {/* Page Content */}
        <main className="">
          {children}
        </main>
        
        {/* Global Resume Popup */}
        <ResumePopup />
      </ResumePopupProvider>
    </RequestPopupProvider>
  );
}; 