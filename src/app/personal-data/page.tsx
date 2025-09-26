'use client';

import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PersonalDataText } from '@/lib/PersonalDataText';

export default function PersonalData() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [returnSection, setReturnSection] = useState<string>('');

  useEffect(() => {
    // Получаем секцию для возврата из URL параметра или localStorage
    const section = searchParams.get('from') || localStorage.getItem('returnSection') || '';
    setReturnSection(section);
  }, [searchParams]);

  const handleBackToMain = () => {
    if (returnSection) {
      // Возвращаемся на главную и прокручиваем к нужной секции
      router.push(`/#${returnSection}`);
    } else {
      // Если секция не указана, возвращаемся просто на главную
      router.push('/');
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center">
      <Header />
      <div className="relative w-full max-w-[1440px] min-h-screen flex flex-col items-start gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-32 pt-16 sm:pt-20 pb-8 mt-16 sm:mt-20">
        {/* Кнопка "На главную" */}
        <button
          onClick={handleBackToMain}
          className="flex items-center gap-1.5 px-0 py-0 text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em] transform rotate-180">
            →
          </span>
          <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
            На главную
          </span>
        </button>
        
        {/* Основной контент */}
        <div className="w-full max-w-[884px] flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <PersonalDataText />
        </div>
      </div>

      {/* Contacts секция (Footer) */}
      <div id="contacts">
        <Footer />
      </div>
    </div>
  );
}
