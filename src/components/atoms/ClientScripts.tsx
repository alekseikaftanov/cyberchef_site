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

    moveIconsToHead();
  }, []);

  return null;
};
