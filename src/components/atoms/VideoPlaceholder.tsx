"use client";

import React from 'react';
import { cn } from '@/utils/cn';

interface VideoPlaceholderProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'hero' | 'service' | 'portfolio' | 'about';
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  title,
  description,
  className,
  variant = 'service',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900';
      case 'service':
        return 'bg-gradient-to-br from-indigo-900 to-purple-900';
      case 'portfolio':
        return 'bg-gradient-to-br from-emerald-900 to-teal-900';
      case 'about':
        return 'bg-gradient-to-br from-orange-900 to-red-900';
      default:
        return 'bg-gradient-to-br from-gray-900 to-slate-900';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
        );
      case 'service':
        return (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'portfolio':
        return (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'about':
        return (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg shadow-2xl min-h-[300px] flex items-center justify-center group",
      getVariantClasses(),
      className
    )}>
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse delay-1000"></div>
      </div>
      
      {/* Сетка */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      {/* Контент */}
      <div className="relative z-10 text-center text-white px-6">
        {getIcon()}
        
        {title && (
          <h3 className="text-2xl font-bold mt-4 mb-2 group-hover:scale-105 transition-transform duration-300">{title}</h3>
        )}
        
        {description && (
          <p className="text-gray-200 text-lg max-w-md group-hover:text-white transition-colors duration-300">{description}</p>
        )}
        
        <div className="mt-6 text-sm text-gray-300 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
          Видео будет добавлено позже
        </div>
      </div>
      
      {/* Градиентная рамка */}
      <div className="absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
      
      {/* Hover эффект */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-cyan-600/0 group-hover:from-purple-600/10 group-hover:via-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-500"></div>
    </div>
  );
};

export default VideoPlaceholder;
