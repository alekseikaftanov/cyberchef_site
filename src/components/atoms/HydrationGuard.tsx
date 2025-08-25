'use client';

import { useEffect, useState } from 'react';

interface HydrationGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const HydrationGuard: React.FC<HydrationGuardProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Принудительно устанавливаем гидратацию как завершенную
    const forceHydration = () => {
      setIsHydrated(true);
    };

    // Небольшая задержка для стабилизации
    const timeoutId = setTimeout(forceHydration, 100);

    // Также проверяем готовность DOM
    if (document.readyState === 'complete') {
      setIsHydrated(true);
    } else {
      window.addEventListener('load', () => setIsHydrated(true));
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Если гидратация не завершена, показываем fallback
  if (!isHydrated) {
    return <>{fallback}</>;
  }

  // Всегда показываем контент после гидратации
  return <>{children}</>;
};
