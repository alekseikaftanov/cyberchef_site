'use client';

import React from 'react';
import { useRequestPopup } from '@/contexts/RequestPopupContext';

interface FutureWidgetProps {
  className?: string;
}

export const FutureWidget: React.FC<FutureWidgetProps> = ({ className }) => {
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

  return (
    <section className={`w-full min-h-[500px] sm:min-h-[600px] lg:h-[800px] relative overflow-hidden ${className}`}>
      {/* Видео фон */}
      <div className="absolute inset-0 w-full h-full lg:w-[1494px] lg:h-[886px] lg:-left-7 top-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/future_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Градиент поверх видео для лучшей читаемости текста */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/20"
        ></div>
      </div>
      
      {/* Основной контент */}
      <div className="relative z-10 h-full flex flex-col justify-start">
        {/* Заголовок */}
        <h2 className="absolute left-4 sm:left-8 md:left-16 lg:left-32 top-16 sm:top-20 w-[280px] sm:w-80 lg:w-96 min-h-[80px] sm:min-h-[100px] lg:min-h-[132px] text-white font-[var(--font-inter)] font-medium text-2xl sm:text-3xl lg:text-[40px] leading-[110%] tracking-[-0.02em]">
          Будущее ритейла начинается сегодня
        </h2>
        
        {/* Кнопка CTA */}
        <button
          onClick={openRequestPopup}
          className="group absolute left-4 sm:left-8 md:left-16 lg:left-32 top-48 sm:top-56 lg:top-59 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 w-[200px] sm:w-[220px] lg:w-[234px] min-h-[40px] sm:min-h-[44px] lg:min-h-[46px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
        >
          <span className="text-white font-[var(--font-inter)] font-medium text-sm sm:text-base leading-[135%] text-center tracking-[-0.04em] w-[160px] sm:w-[170px] lg:w-[180px] min-h-[20px] sm:min-h-[21px] lg:min-h-[22px]">
            Получить консультацию
          </span>
          <span className="text-white font-[var(--font-inter)] font-medium text-sm sm:text-base leading-[135%] tracking-[-0.04em] w-3.5 sm:w-4 min-h-[20px] sm:min-h-[21px] lg:min-h-[22px]">
            →
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
        </button>
      </div>
    </section>
  );
};

export default FutureWidget;
