import React from 'react';
import { cn } from '@/utils/cn';

interface HeroBackgroundPlaceholderProps {
  className?: string;
}

export const HeroBackgroundPlaceholder: React.FC<HeroBackgroundPlaceholderProps> = ({
  className,
}) => {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900"></div>
      
      {/* Анимированные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Плавающие круги */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-cyan-500/20 rounded-full animate-pulse delay-2000"></div>
        
        {/* Сетка */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Световые эффекты */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-600/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>
      
      {/* Градиентное затемнение */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
    </div>
  );
};

export default HeroBackgroundPlaceholder;

