'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import { WidgetContent } from './WidgetContent';

interface WidgetProps {
  className?: string;
  children?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({ className, children }) => {
  return (
    <div className={cn(
      'relative w-[400px] h-[500px] bg-[#6C1EFF] rounded-[40px] p-[30px] flex flex-col items-start gap-4 isolate',
      className
    )}>
      {/* Иконка в левом верхнем углу */}
      <div className="w-10 h-10 border-2 border-white/25 rounded-xl flex items-center justify-center flex-none order-0 self-stretch flex-grow-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.7008 4.5001C17.7008 2.07 15.7308 0.1001 13.3008 0.1001H6.7008C4.2707 0.1001 2.3008 2.07 2.3008 4.5001" stroke="white" strokeWidth="2.2"/>
          <path d="M2.3008 15.5C2.3008 17.9301 4.2707 19.9 6.7008 19.9L13.3008 19.9C15.7308 19.9 17.7008 17.9301 17.7008 15.5" stroke="white" strokeWidth="2.2"/>
          <rect x="1.1992" y="6.7002" width="2.2" height="7.7" fill="white"/>
          <rect x="18.8008" y="13.2998" width="2.2" height="17.6" transform="rotate(90 18.8008 13.2998)" fill="white"/>
          <rect x="16.5996" y="6.7002" width="2.2" height="7.7" fill="white"/>
        </svg>
      </div>
      
      {/* Контент виджета */}
      <WidgetContent>
        {children}
      </WidgetContent>
    </div>
  );
}; 