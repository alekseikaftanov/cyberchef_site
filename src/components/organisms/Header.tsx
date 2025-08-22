'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRequestPopup } from '@/contexts/RequestPopupContext';

interface HeaderProps {
  onMenuToggle?: (isMenuOpen: boolean) => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  let openRequestPopup: (() => void) | undefined;
  
  try {
    const context = useRequestPopup();
    openRequestPopup = context.openRequestPopup;
  } catch {
    // Fallback если контекст недоступен
    openRequestPopup = () => {
      console.warn('RequestPopup context not available');
    };
  }
  
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 120;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-center bg-transparent">
      {/* Desktop Header */}
      <div className="hidden lg:flex w-[1208px] h-[62px] px-2 py-2 bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl items-center justify-between mt-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" aria-label="На главную" className="flex items-center">
            <Image 
              src="/pictures/header/Logo.svg" 
              alt="Кибершеф" 
              width={112} 
              height={21} 
              priority 
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] hover:text-gray-200 transition-colors cursor-pointer"
          >
            О нас
          </button>
          
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] hover:text-gray-200 transition-colors cursor-pointer"
          >
            Услуги
          </button>
          
          <button 
            onClick={() => scrollToSection('contacts')}
            className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] hover:text-gray-200 transition-colors cursor-pointer"
          >
            Контакты
          </button>
        </nav>

        {/* CTA Button */}
        <button
          onClick={openRequestPopup}
          className="flex items-center justify-center gap-1.5 px-4 py-3 w-[185px] h-[46px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all cursor-pointer"
        >
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
            Связаться с нами
          </span>
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
            →
          </span>
        </button>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full px-6 py-4">
        <div className="flex items-center w-full h-[60px] bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl px-4">
          {/* Logo */}
          <div className="flex items-center flex-1">
            <Link href="/" aria-label="На главную" className="flex items-center">
              <Image 
                src="/pictures/header/Logo.svg" 
                alt="Кибершеф" 
                width={110} 
                height={19} 
                priority 
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => onMenuToggle?.(!isMenuOpen)}
            className="w-[44px] h-[44px] bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center cursor-pointer"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}; 