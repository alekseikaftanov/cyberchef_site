'use client';

import { useEffect, useState } from 'react';

interface SafeHydrationProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SafeHydration: React.FC<SafeHydrationProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
