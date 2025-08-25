'use client';

import { useEffect } from 'react';

export const ClientScripts = () => {
  useEffect(() => {
    // Перемещаем иконки в head только на клиенте
    const moveIconsToHead = () => {
      const bodyIcons = document.querySelectorAll('body link[rel="icon"], body link[rel="apple-touch-icon"]');
      bodyIcons.forEach((icon) => {
        document.head.appendChild(icon);
      });
    };

    // Очищаем скрипты от браузерных расширений
    const cleanExtensionScripts = () => {
      try {
        // Удаляем скрипты от браузерных расширений
        const extensionScripts = document.querySelectorAll('script[src*="chrome-extension"], script[src*="moz-extension"]');
        extensionScripts.forEach(script => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });

        // Очищаем атрибуты, которые могут вызывать ошибки гидратации
        const allScripts = document.querySelectorAll('script');
        allScripts.forEach(script => {
          if (script.type === null || script.type === '') {
            script.type = 'text/javascript';
          }
          // Проверяем innerHTML вместо dangerouslySetInnerHTML
          if (script.innerHTML === '') {
            script.innerHTML = '';
          }
        });
      } catch (error) {
        console.warn('Failed to clean extension scripts:', error);
      }
    };

    // Выполняем очистку после полной загрузки страницы
    if (document.readyState === 'complete') {
      moveIconsToHead();
      cleanExtensionScripts();
    } else {
      window.addEventListener('load', () => {
        moveIconsToHead();
        cleanExtensionScripts();
      });
    }

    // Дополнительная очистка через небольшую задержку
    const timeoutId = setTimeout(() => {
      cleanExtensionScripts();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
};
