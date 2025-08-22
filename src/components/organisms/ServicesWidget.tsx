'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface ServicesWidgetProps {
  className?: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  tag: string | null;
  width: string;
  height: string;
  hasImage: boolean;
  isVideo: boolean;
}

export const ServicesWidget: React.FC<ServicesWidgetProps> = ({ className }) => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Интеллектуальные магазины',
      description: 'Автоматизация точек продаж, внедрение электронных ценников, кассы самообслуживания, системы видеоналитики для предотвращения потерь',
      image: '/videos/shopping_video.mp4',
      tag: 'Популярное',
      width: 'w-full',
      height: 'h-[320px]',
      hasImage: true,
      isVideo: true
    },
    {
      id: 2,
      title: 'Автоматизация back-office',
      description: 'Интеграция ERP/CRM решений, управление персоналом и процессами закупок, контроль издержек.',
      image: null,
      tag: 'Под ключ',
      width: 'w-[684px]',
      height: 'h-[320px]',
      hasImage: false,
      isVideo: false
    },
    {
      id: 3,
      title: 'Продуктовая аналитика',
      description: 'Анализ продаж в реальном времени, прогнозирование спроса, оптимизация ассортимента и цен.',
      image: '/pictures/services/analitics.svg',
      tag: null,
      width: 'w-[484px]',
      height: 'h-[320px]',
      hasImage: true,
      isVideo: false
    },
    {
      id: 4,
      title: 'Умная логистика и склад',
      description: 'Автоматизация цепочек поставок, оптимизация маршрутов доставки, роботизация складов.',
      image: '/pictures/services/logistic.svg',
      tag: null,
      width: 'w-[484px]',
      height: 'h-[320px]',
      hasImage: true,
      isVideo: false
    },
    {
      id: 5,
      title: 'Персонализация клиентского опыта',
      description: 'Внедрение рекомендательных систем, программы лояльности нового поколения, персональные предложения на основе данных о покупках',
      image: null,
      tag: null,
      width: 'w-[684px]',
      height: 'h-[320px]',
      hasImage: false,
      isVideo: false
    }
  ];

  return (
    <section className={cn("w-full bg-black", className)}>
      {/* Основной контейнер */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-32 py-20 md:py-24 lg:py-30">
        {/* Внутренний контейнер с границей сверху */}
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-4 pt-10 border-t border-white/25">
          
          {/* Левая колонка - Заголовок "Наши услуги" */}
          <div className="flex items-center gap-1.5 w-full lg:w-[284px] h-[22px]">
            <Image
              src="/pictures/services/icon_logo_white.svg"
              alt="Кибершеф"
              width={9}
              height={11}
              className="w-[8.46px] h-[10px]"
            />
            <h2 className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
              Наши услуги
            </h2>
          </div>

          {/* Правая колонка - Основной контент */}
          <div className="flex flex-col gap-6 w-full lg:w-[884px]">
            
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-6 w-full">
              <h3 className="text-white font-[var(--font-inter)] font-medium text-2xl md:text-3xl lg:text-[40px] leading-[110%] tracking-[-0.02em] max-w-[884px]">
                Фокусируемся на вашем запросе
              </h3>
              
              <p className="text-white/80 font-[var(--font-inter)] font-normal text-lg md:text-xl lg:text-[20px] leading-[135%] tracking-[-0.02em] max-w-[884px]">
                Адаптируем пакеты предложений под ваш индивидуальный запрос. Так мы сможем подобрать наиболее подходящий путь для вашего бизнеса.
              </p>
            </div>
          </div>
        </div>

        {/* Карточки услуг */}
        <div className="flex flex-wrap items-start gap-4 w-full mt-25">
          {services.map((service) => (
            <div 
              key={service.id}
              className={cn(
                "relative bg-white/10 rounded-2xl overflow-hidden",
                service.width,
                service.height
              )}
            >
              {/* Фоновое изображение или видео */}
              {service.hasImage && service.image && (
                <div className="absolute inset-0">
                  {service.isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'brightness(0.8) contrast(1.2)'
                      }}
                    >
                      <source src={service.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      style={{
                        filter: 'brightness(0.8) contrast(1.2)'
                      }}
                    />
                  )}
                  {/* Градиент поверх изображения/видео */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50"></div>
                </div>
              )}

              {/* Тег */}
              {service.tag && (
                <div className="absolute top-10 right-10 flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[38px]">
                  <Image
                    src="/pictures/services/icon_logo_white.svg"
                    alt="Кибершеф"
                    width={9}
                    height={11}
                    className="w-[9px] h-[11px]"
                  />
                  <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
                    {service.tag}
                  </span>
                </div>
              )}

              {/* Контент карточки */}
              <div className={cn(
                "absolute left-10",
                service.id === 1 ? "top-[139px]" : "bottom-10"
              )}>
                <div className="flex flex-col gap-4 max-w-[644px]">
                  <h4 className="text-white font-[var(--font-inter)] font-medium text-2xl md:text-3xl lg:text-[40px] leading-[110%] tracking-[-0.02em]">
                    {service.title}
                  </h4>
                  
                  <p className="text-white/80 font-[var(--font-inter)] font-normal text-lg md:text-xl lg:text-[20px] leading-[135%] tracking-[-0.02em]">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesWidget;
