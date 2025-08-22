"use client";

import React from 'react';
import { cn } from '@/utils/cn';

interface VideoHeroWidgetProps {
  backgroundVideo?: string;
  className?: string;
}

export const VideoHeroWidget: React.FC<VideoHeroWidgetProps> = ({
  backgroundVideo = "/videos/heroblock_video.mp4",
  className,
}) => {
  return (
    <div className={cn("relative min-h-screen flex items-end overflow-hidden pt-20", className)}>
      {/* Видео фон */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.7) contrast(1.2)'
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Градиент поверх видео для лучшей читаемости текста */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20"
        ></div>
      </div>
      
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
