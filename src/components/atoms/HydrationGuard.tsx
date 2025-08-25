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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Проверяем, что гидратация прошла успешно
    const checkHydration = () => {
      try {
        // Проверяем, что DOM полностью загружен
        if (document.readyState === 'complete') {
          setIsHydrated(true);
        } else {
          // Ждем полной загрузки DOM
          window.addEventListener('load', () => setIsHydrated(true));
        }
      } catch (error) {
        console.warn('Hydration check failed:', error);
        setHasError(true);
        setIsHydrated(true); // Показываем контент даже при ошибке
      }
    };

    checkHydration();

    // Обработчик ошибок гидратации
    const handleHydrationError = (event: ErrorEvent) => {
      if (event.message.includes('hydration') || event.message.includes('Hydration')) {
        console.warn('Hydration error detected, attempting recovery...');
        setHasError(true);
        setIsHydrated(true);
      }
    };

    window.addEventListener('error', handleHydrationError);

    return () => {
      window.removeEventListener('error', handleHydrationError);
    };
  }, []);

  // Если гидратация не завершена, показываем fallback
  if (!isHydrated) {
    return <>{fallback}</>;
  }

  // Если была ошибка гидратации, показываем контент с предупреждением
  if (hasError) {
    return (
      <>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.warn('Hydration completed with warnings. This is normal when browser extensions modify the DOM.');
            `
          }}
        />
      </>
    );
  }

  return <>{children}</>;
};
