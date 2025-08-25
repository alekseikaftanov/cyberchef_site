'use client';

import { useEffect, useRef } from 'react';

export const ExtensionBlocker = () => {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Функция для очистки скриптов от расширений
    const cleanExtensionScripts = () => {
      try {
        // Удаляем все скрипты от браузерных расширений
        const extensionScripts = document.querySelectorAll('script[src*="chrome-extension"], script[src*="moz-extension"], script[src*="safari-extension"]');
        extensionScripts.forEach(script => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });

        // Очищаем скрипты с пустыми атрибутами
        const allScripts = document.querySelectorAll('script');
        allScripts.forEach(script => {
          // Исправляем type атрибут
          if (script.type === null || script.type === '') {
            script.type = 'text/javascript';
          }
          
          // Удаляем пустые dangerouslySetInnerHTML
          if (script.hasAttribute('dangerouslySetInnerHTML') && script.innerHTML === '') {
            script.removeAttribute('dangerouslySetInnerHTML');
          }
        });
      } catch (error) {
        console.warn('Failed to clean extension scripts:', error);
      }
    };

    // Функция для наблюдения за изменениями DOM
    const observeDOMChanges = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new MutationObserver((mutations) => {
        let shouldClean = false;
        
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.tagName === 'SCRIPT') {
                  const script = element as HTMLScriptElement;
                  // Проверяем, является ли скрипт от расширения
                  if (script.src && (
                    script.src.includes('chrome-extension') ||
                    script.src.includes('moz-extension') ||
                    script.src.includes('safari-extension')
                  )) {
                    shouldClean = true;
                  }
                }
              }
            });
          }
        });

        if (shouldClean) {
          // Небольшая задержка для завершения всех изменений
          setTimeout(cleanExtensionScripts, 10);
        }
      });

      // Начинаем наблюдение
      observerRef.current.observe(document.head, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'type', 'dangerouslySetInnerHTML']
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'type', 'dangerouslySetInnerHTML']
      });
    };

    // Выполняем первоначальную очистку
    cleanExtensionScripts();

    // Начинаем наблюдение за изменениями
    observeDOMChanges();

    // Периодическая очистка каждые 500ms
    const intervalId = setInterval(cleanExtensionScripts, 500);

    // Очистка при размонтировании
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(intervalId);
    };
  }, []);

  return null;
};
