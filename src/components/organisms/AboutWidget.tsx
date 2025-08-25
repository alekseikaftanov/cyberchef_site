'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface AboutWidgetProps {
  className?: string;
}

export const AboutWidget: React.FC<AboutWidgetProps> = ({ className }) => {
  const features = [
    {
      icon: '/pictures/about/about_1.svg',
      title: 'Увеличение выручки через персонализацию',
      description: 'Персонализированные предложения для каждого клиента'
    },
    {
      icon: '/pictures/about/about_2.svg',
      title: 'Снижение издержек за счёт автоматизации',
      description: 'Автоматизация рутинных процессов'
    },
    {
      icon: '/pictures/about/about_3.svg',
      title: 'Улучшение клиентского сервиса и удержания',
      description: 'Повышение качества обслуживания клиентов'
    },
    {
      icon: '/pictures/about/about_4.svg',
      title: 'Быстрая адаптация к изменению спроса',
      description: 'Гибкость и скорость реагирования на изменения'
    }
  ];

  return (
    <section className={cn("w-full bg-white", className)}>
      {/* Основной контейнер */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-32 py-20 md:py-24 lg:py-30">
        {/* Внутренний контейнер с границей сверху */}
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-4 pt-10 border-t border-black/10">
          
          {/* Левая колонка - Заголовок "О нас" */}
          <div className="flex items-center gap-1.5 w-full lg:w-[284px] h-[22px]">
            <Image
              src="/pictures/about/icon_logo.svg"
              alt="Кибершеф"
              width={11}
              height={12}
              className="w-[8.46px] h-[10px]"
            />
            <h2 className="text-black font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
              О нас
            </h2>
          </div>

          {/* Правая колонка - Основной контент */}
          <div className="flex flex-col gap-20 w-full lg:w-[884px]">
            
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-6 w-full">
              <h3 className="text-black font-[var(--font-inter)] font-medium text-2xl md:text-3xl lg:text-[40px] leading-[110%] tracking-[-0.02em] max-w-[884px]">
                Внедряем передовые технологии, которые делают торговлю эффективнее, удобнее для покупателей и прозрачнее для бизнеса.
              </h3>
              
              <p className="text-black/80 font-[var(--font-inter)] font-normal text-lg md:text-xl lg:text-[20px] leading-[135%] tracking-[-0.02em] max-w-[884px]">
                Компания «Кибершеф» учреждена ВкусВиллом для развития технологической инфраструктуры в ритейле и цифровой трансформации бизнес-процессов. Свяжитесь с нами, чтобы узнать больше о наших услугах и учтонить стоимость проекта
              </p>
            </div>

            {/* Карточки преимуществ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-start p-6 gap-6 w-full h-[218px] border border-black/10 rounded-2xl"
                >
                  {/* Иконка */}
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Текст */}
                  <p className="text-black/80 font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] w-full">
                    {feature.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWidget;
