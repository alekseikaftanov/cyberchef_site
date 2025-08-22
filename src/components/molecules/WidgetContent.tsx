'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface WidgetContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const WidgetContent: React.FC<WidgetContentProps> = ({ className, children }) => {
  return (
    <div className={cn(
      'flex flex-col items-start gap-3 p-0 w-[340px] h-[176px] flex-none order-1 self-stretch flex-grow-0 z-[1]',
      className
    )}>
      {children}
    </div>
  );
}; 