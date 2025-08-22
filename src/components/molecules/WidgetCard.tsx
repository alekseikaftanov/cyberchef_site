'use client';

import React, { isValidElement, ReactElement } from 'react';
import { cn } from '@/utils/cn';

interface WidgetCardProps {
  bgColor?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode;
  textColor?: string;
  iconBorderColor?: 'white' | 'black';
  className?: string;
  children?: React.ReactNode;
  bottomImage?: string; // путь к нижней картинке
}

const IconBox: React.FC<{children: React.ReactNode; iconBorderColor?: 'white' | 'black'}> = ({ children, iconBorderColor }) => {
  // Белый border для цветных карточек, чёрный — для белых
  const border = iconBorderColor === 'black'
    ? 'border-black'
    : 'border-white/25';
  return (
    <div
      className={cn(
        'w-10 h-10 aspect-square flex items-center justify-center rounded-xl border-2',
        border
      )}
      style={{ borderRadius: 12, border: iconBorderColor === 'black' ? '2px solid #333' : '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}
    >
      {typeof children === 'string' ? (
        <img src={children} alt="icon" style={{ maxWidth: 20, maxHeight: 20 }} />
      ) : isValidElement(children) && (children.type === 'img') ? (
        React.cloneElement(children as ReactElement<{style?: React.CSSProperties}>, {
          style: { maxWidth: 20, maxHeight: 20 }
        })
      ) : children}
    </div>
  );
};

export const WidgetCard: React.FC<WidgetCardProps> = ({
  bgColor = 'bg-white',
  icon,
  title,
  text,
  textColor = 'text-white',
  iconBorderColor,
  className,
  children,
  bottomImage,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-[40px] p-[30px] flex flex-col gap-4 min-h-[176px] min-w-[280px] max-w-full shadow-sm overflow-hidden',
        bgColor,
        className
      )}
      style={{ isolation: 'isolate' }}
    >
      {/* Иконка в контейнере */}
      {icon && (
        <IconBox iconBorderColor={iconBorderColor}>
          {typeof icon === 'string' ? (
            <img 
              src={icon} 
              alt="icon" 
              width={20} 
              height={20}
              onError={(e) => {
                console.error(`Failed to load icon: ${icon}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : icon}
        </IconBox>
      )}
      <div className={cn('font-semibold text-2xl leading-tight', textColor)}>{title}</div>
      <div
        className={cn('font-medium text-lg', textColor === 'text-white' ? 'text-white' : 'text-[#333]')}
        style={textColor === 'text-white' ? { color: '#FFFFFF', opacity: 0.8 } : { color: '#333333', opacity: 0.8 }}
      >
        {text}
      </div>
      {children}
      {/* Нижняя картинка, если есть */}
      {bottomImage && (
        <img
          src={bottomImage}
          alt=""
          className="mt-auto object-contain"
          style={{
            maxHeight: bottomImage.includes('web-picture') ? 340 : 200,
            position: 'absolute',
            bottom: 0,
            width: bottomImage.includes('web-picture') ? '100%' : 'calc(70% + 30px)',
            zIndex: 0,
            ...(bottomImage.includes('web-picture') ? { left: 0 } : { right: 0 })
          }}
        />
      )}
    </div>
  );
}; 