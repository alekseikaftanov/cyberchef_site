"use client";
import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  durationMs?: number;
  delayMs?: number;
  triggerOnScroll?: boolean;
  id?: string; // уникальный идентификатор для sessionStorage
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  durationMs = 600,
  delayMs = 0,
  triggerOnScroll = false,
  id = 'default',
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Проверяем, была ли уже показана анимация в этой сессии
    const storageKey = `fadeIn-${id}`;
    const wasShown = sessionStorage.getItem(storageKey);
    
    if (wasShown === 'true') {
      // Если уже показывали, сразу делаем видимым без анимации
      setShow(true);
      return;
    }

    if (!triggerOnScroll) {
      // Анимация при загрузке страницы
      const timeout = setTimeout(() => {
        setShow(true);
        // Сохраняем в sessionStorage что анимация уже была показана
        sessionStorage.setItem(storageKey, 'true');
      }, delayMs);
      return () => clearTimeout(timeout);
    }

    const node = ref.current;
    if (!node) return;

    // Проверяем, что мы на клиенте и IntersectionObserver доступен
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setShow(true);
            // Сохраняем в sessionStorage что анимация уже была показана
            sessionStorage.setItem(storageKey, 'true');
          }, delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [delayMs, triggerOnScroll, id]);

  return (
    <div
      ref={ref}
      style={{
        transition: `opacity ${durationMs}ms cubic-bezier(0.4,0,0.2,1), transform ${durationMs}ms cubic-bezier(0.4,0,0.2,1)`,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(20px)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn; 