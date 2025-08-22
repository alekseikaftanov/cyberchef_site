"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { HeroBackgroundPlaceholder } from '@/components/atoms/HeroBackgroundPlaceholder';

interface VideoHeroWidgetProps {
  backgroundImage?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const VideoHeroWidget: React.FC<VideoHeroWidgetProps> = ({
  backgroundImage = "/pictures/hero/HeroBlock.svg",
  onCtaClick,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={cn("relative min-h-screen flex items-end overflow-hidden pt-20", className)}>
      {/* Фоновое изображение с градиентом или заглушка */}
      {!imageError && backgroundImage ? (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%), url(${backgroundImage})`
          }}
        >
          {/* Скрытое изображение для проверки загрузки */}
          <img
            src={backgroundImage}
            alt=""
            className="hidden"
            onError={handleImageError}
          />
        </div>
      ) : (
        <HeroBackgroundPlaceholder />
      )}
      
      {/* Контент - позиционирован внизу слева согласно дизайну */}
      <div className="relative z-10 flex flex-col items-start px-8 md:px-32 lg:px-32 gap-6 pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
          Цифровая трансформация ритейла от «Кибершеф»
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl">
          Мы создаем технологическую инфраструктуру для современного ритейла: от умных магазинов до интеллектуальной логистики.
        </p>
      </div>
    </div>
  );
};

export default VideoHeroWidget;
