"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface VideoHeroWidgetProps {
  backgroundVideo?: string;
  className?: string;
}

export const VideoHeroWidget: React.FC<VideoHeroWidgetProps> = ({
  backgroundVideo = "/videos/heroblock_video.mp4",
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;



    // Функция для принудительного воспроизведения
    const forcePlay = async () => {
      try {
        // Сначала пробуем обычное воспроизведение
        await video.play();
      } catch (error) {
        // Если браузер блокирует автовоспроизведение, пробуем другие способы
        if (error instanceof Error && error.name === 'NotAllowedError') {
          // Пробуем воспроизвести после взаимодействия пользователя
          const handleUserInteraction = async () => {
            try {
              await video.play();
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
            } catch (playError) {
              // Игнорируем ошибки воспроизведения
            }
          };
          
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
          document.addEventListener('touchstart', handleUserInteraction);
        }
      }
    };

    // Обработчик загрузки метаданных
    const handleLoadedMetadata = () => {
      // Начинаем воспроизведение только после загрузки метаданных
      forcePlay();
    };

    // Обработчик начала воспроизведения
    const handlePlay = () => {
      // Воспроизведение началось
    };

    // Обработчик паузы
    const handlePause = () => {
      // Если видео было приостановлено не по нашей воле, пробуем возобновить
      if (!video.ended) {
        setTimeout(() => {
          if (video.paused && !video.ended) {
            forcePlay();
          }
        }, 1000);
      }
    };

    // Обработчик окончания видео
    const handleEnded = () => {
      // Небольшая задержка перед перезапуском
      setTimeout(() => {
        if (video.ended) {
          video.currentTime = 0;
          forcePlay();
        }
      }, 100);
    };

    // Обработчик ошибок
    const handleError = (event: Event) => {
      // Игнорируем ошибки видео
    };

    // Обработчик прогресса загрузки
    const handleProgress = () => {
      // Отслеживаем прогресс загрузки
    };

    // Добавляем все обработчики событий
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);

    // Очистка при размонтировании
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('progress', handleProgress);
    };
  }, []);

  return (
    <div className={cn("relative min-h-screen flex items-end overflow-hidden pt-20", className)}>
      {/* Видео фон */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.7) contrast(1.2)'
          }}
          // Дополнительные атрибуты для стабильности
          disablePictureInPicture
          disableRemotePlayback
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
