"use client";

import React, { useRef, useEffect, useState } from 'react';
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('🎥 VideoHeroWidget: Инициализация видео');

    // Функция для логирования состояния видео
    const logVideoState = () => {
      console.log('🎥 Состояние видео:', {
        currentTime: video.currentTime,
        duration: video.duration,
        paused: video.paused,
        ended: video.ended,
        readyState: video.readyState,
        networkState: video.networkState
      });
    };

    // Функция для принудительного воспроизведения
    const forcePlay = async () => {
      try {
        // Сначала пробуем обычное воспроизведение
        await video.play();
        console.log('🎥 Воспроизведение началось успешно');
      } catch (error) {
        console.warn('🎥 Ошибка при начале воспроизведения:', error);
        
        // Если браузер блокирует автовоспроизведение, пробуем другие способы
        if (error instanceof Error && error.name === 'NotAllowedError') {
          console.log('🎥 Браузер заблокировал автовоспроизведение, пробуем обходные пути...');
          
          // Пробуем воспроизвести после взаимодействия пользователя
          const handleUserInteraction = async () => {
            try {
              await video.play();
              console.log('🎥 Воспроизведение началось после взаимодействия пользователя');
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('keydown', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
            } catch (playError) {
              console.warn('🎥 Не удалось воспроизвести даже после взаимодействия:', playError);
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
      setVideoDuration(video.duration);
      setIsVideoReady(true);
      console.log(`🎥 Видео загружено! Длительность: ${video.duration} секунд`);
      
      // Начинаем воспроизведение только после загрузки метаданных
      forcePlay();
    };

    // Обработчик начала воспроизведения
    const handlePlay = () => {
      console.log('🎥 Воспроизведение началось');
    };

    // Обработчик паузы
    const handlePause = () => {
      console.log('🎥 Воспроизведение приостановлено');
      // Если видео было приостановлено не по нашей воле, пробуем возобновить
      if (!video.ended) {
        setTimeout(() => {
          if (video.paused && !video.ended) {
            console.log('🎥 Автоматически возобновляем воспроизведение');
            forcePlay();
          }
        }, 1000);
      }
    };

    // Обработчик окончания видео
    const handleEnded = () => {
      console.log('🎥 Видео закончилось, начинаем заново');
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
      console.error('🎥 Ошибка видео:', event);
    };

    // Обработчик прогресса загрузки
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        console.log(`🎥 Загружено: ${bufferedEnd.toFixed(2)}s из ${video.duration.toFixed(2)}s`);
      }
    };

    // Добавляем все обработчики событий
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('progress', handleProgress);

    // Логируем состояние каждые 2 секунды для отладки
    const logInterval = setInterval(logVideoState, 2000);

    // Очистка при размонтировании
    return () => {
      clearInterval(logInterval);
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
        
        {/* Отладочная информация (только в development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-sm text-gray-400 bg-black/20 px-3 py-2 rounded">
            🎥 Видео: {isVideoReady ? `Готово (${videoDuration.toFixed(1)}s)` : 'Загружается...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHeroWidget;
