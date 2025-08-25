'use client';

import { ClientLayout } from '@/components/organisms/ClientLayout';
import { VideoHeroWidget } from '@/components/organisms/VideoHeroWidget';
import { AboutWidget } from '@/components/organisms/AboutWidget';
import { ServicesWidget } from '@/components/organisms/ServicesWidget';
import { FutureWidget } from '@/components/organisms/FutureWidget';
import FadeIn from '@/components/atoms/FadeIn';
import { Footer } from '@/components/organisms/Footer';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Проверяем, есть ли хэш в URL для прокрутки к нужной секции
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Убираем # из начала
        const sectionId = hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          // Прокручиваем к элементу с небольшей задержкой для корректного рендеринга
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, []);

  return (
    <ClientLayout>
      {/* Hero секция */}
      <div id="hero">
        <FadeIn durationMs={1000} delayMs={300} triggerOnScroll id="hero-fade">
          <VideoHeroWidget />
        </FadeIn>
      </div>

      {/* About секция */}
      <div id="about">
        <FadeIn durationMs={1000} delayMs={500} triggerOnScroll id="about-fade">
          <AboutWidget />
        </FadeIn>
      </div>

      {/* Services секция */}
      <div id="services">
        <FadeIn durationMs={1000} delayMs={700} triggerOnScroll id="services-fade">
          <ServicesWidget />
        </FadeIn>
      </div>

      {/* Future секция */}
      <div id="future">
        <FadeIn durationMs={1000} delayMs={900} triggerOnScroll id="future-fade">
          <FutureWidget />
        </FadeIn>
      </div>

      {/* Contacts секция (Footer) */}
      <div id="contacts">
        <Footer />
      </div>
    </ClientLayout>
  );
}




