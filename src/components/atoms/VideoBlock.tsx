"use client";

import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { VideoPlaceholder } from './VideoPlaceholder';

interface VideoBlockProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  variant?: 'hero' | 'service' | 'portfolio' | 'about';
  type?: 'video' | 'image';
}

export const VideoBlock: React.FC<VideoBlockProps> = ({
  src,
  poster,
  title,
  description,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  variant = 'service',
  type = 'video',
}) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Проверяем, доступно ли видео
  const isVideoAvailable = src && !videoError && videoLoaded;

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Если это изображение
  if (type === 'image') {
    return (
      <div className={cn("relative w-full", className)}>
        {title && (
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            {description && (
              <p className="text-gray-300 text-lg">{description}</p>
            )}
          </div>
        )}
        
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <img
            src={src}
            alt={title || description || 'Изображение'}
            className="w-full h-auto object-cover"
            onError={() => {
              // Если изображение не загрузилось, показываем заглушку
              return (
                <VideoPlaceholder
                  title={title}
                  description={description}
                  variant={variant}
                  className={className}
                />
              );
            }}
          />
          
          {/* Градиентная рамка */}
          <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/10"></div>
        </div>
      </div>
    );
  }

  // Если видео недоступно, показываем заглушку
  if (!isVideoAvailable) {
    return (
      <VideoPlaceholder
        title={title}
        description={description}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {title && (
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          {description && (
            <p className="text-gray-300 text-lg">{description}</p>
          )}
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        <video
          className="w-full h-auto"
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
        >
          <source src={src} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        
        {/* Градиентная рамка */}
        <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/10"></div>
      </div>
    </div>
  );
};

export default VideoBlock;
