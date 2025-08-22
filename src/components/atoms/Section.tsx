'use client';

import { SectionProps } from '@/types';
import { cn } from '@/utils/cn';

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}; 