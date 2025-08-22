'use client'

import { useRequestPopup } from '@/contexts/RequestPopupContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  let openRequestPopup: (() => void) | undefined;
  
  try {
    const context = useRequestPopup();
    openRequestPopup = context.openRequestPopup;
  } catch {
    // Fallback если контекст недоступен
    openRequestPopup = () => {
      console.warn('RequestPopup context not available');
      onClose();
    };
  }
  
  if (!isOpen) return null;

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 120; // Примерная высота хедера
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/20" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu content - sticky positioned with proper height */}
      <div className="sticky top-0 w-full h-screen bg-white flex flex-col">
        {/* Menu header spacer - accounting for sticky header */}
        <div className="h-[60px] bg-white"></div>
        
        {/* Menu content */}
        <div className="flex-1 px-6 pb-6 overflow-y-auto">
          <nav className="space-y-1">
            {/* Menu items - same as desktop */}
            <button 
              onClick={() => scrollToSection('about')}
              className="w-full text-left py-4 text-[24px] font-semibold text-[#333] font-montserrat hover:text-[#666] transition-colors cursor-pointer"
            >
              О нас
            </button>
            
            <button 
              onClick={() => scrollToSection('services')}
              className="w-full text-left py-4 text-[24px] font-semibold text-[#333] font-montserrat hover:text-[#666] transition-colors cursor-pointer"
            >
              Услуги
            </button>
            
            <button 
              onClick={() => scrollToSection('contacts')}
              className="w-full text-left py-4 text-[24px] font-semibold text-[#333] font-montserrat hover:text-[#666] transition-colors cursor-pointer"
            >
              Контакты
            </button>
          </nav>
        </div>

        {/* Bottom CTA Button */}
        <div className="p-6 bg-white">
          <button
            onClick={() => {
              openRequestPopup();
              onClose();
            }}
            className="w-full bg-[#A5F04B] text-[#333] font-semibold text-[18px] rounded-[20px] px-6 py-4 flex items-center justify-center transition-colors hover:bg-[#8EDB1B] font-inter"
          >
            Оставить заявку
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 