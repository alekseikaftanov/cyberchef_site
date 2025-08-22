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
    <section className={`w-full h-[800px] relative overflow-hidden ${className}`}>
      {/* Видео фон */}
      <div className="absolute inset-0 w-[1494px] h-[886px] -left-7 top-0">
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
        <h2 className="absolute left-32 top-20 w-96 h-33 text-white font-[var(--font-inter)] font-medium text-[40px] leading-[110%] tracking-[-0.02em]">
          Будущее ритейла начинается сегодня
        </h2>
        
        {/* Кнопка CTA */}
        <button
          onClick={openRequestPopup}
          className="absolute left-32 top-59 flex items-center justify-center gap-1.5 px-4 py-3 w-[234px] h-[46px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all cursor-pointer"
        >
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] text-center tracking-[-0.04em] w-[180px] h-[22px]">
            Получить консультацию
          </span>
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em] w-4 h-[22px]">
            →
          </span>
        </button>
      </div>
    </section>
  );
};

export default FutureWidget;
