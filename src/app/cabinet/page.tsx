'use client';

import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Cabinet() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-[1880px] h-[860px] bg-gradient-to-br from-[#7B3FF2] to-[#6C2BD7] rounded-[40px] mx-2 sm:mx-auto flex items-center justify-center mt-5 mb-5 overflow-hidden">
          
          {/* Волнистые линии на фоне */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-0 right-0 h-px bg-white/30 transform -skew-y-12"></div>
            <div className="absolute top-16 left-0 right-0 h-px bg-white/20 transform skew-y-12"></div>
            <div className="absolute top-28 left-0 right-0 h-px bg-white/25 transform -skew-y-12"></div>
            <div className="absolute top-40 left-0 right-0 h-px bg-white/15 transform skew-y-12"></div>
          </div>
          
          {/* Центрированный контент */}
          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-[685px]">
            
            {/* Иконка инструментов */}
            <div className="relative z-10 mb-8">
              <img 
                src="/pictures/cabinet/personal.svg" 
                alt="Иконка личного кабинета" 
                className="w-32 h-32 mx-auto"
              />
            </div>
            
            {/* Текст */}
            <div className="relative z-10 flex flex-col items-center gap-5 w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <h2 className="font-montserrat font-bold text-[28px] sm:text-[24px] leading-[120%] tracking-[-0.06em] text-white text-center">
                  Личный кабинет временно в мастерской
                </h2>
                
                <span className="font-inter font-normal text-[20px] sm:text-[18px] leading-[150%] tracking-[-0.04em] text-[#F5F7FA] text-center opacity-80">
                  Мы активно работаем над его улучшением — скоро здесь будет ещё удобнее!
                </span>
                
                <span className="font-inter font-normal text-[20px] sm:text-[18px] leading-[150%] tracking-[-0.04em] text-[#F5F7FA] text-center opacity-80">
                  Пока вы можете воспользоваться привычным{' '}
                  <a 
                    href="https://bitrix.automacon.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    Bitrix24
                  </a>
                </span>
              </div>
              
              {/* Кнопка назад */}
              <button
                onClick={() => router.push('/')}
                className="mt-4 flex flex-row items-center gap-2 px-5 py-4 bg-white rounded-[14px] shadow font-inter font-medium text-[20px] text-[#333] hover:bg-gray-100 transition cursor-pointer"
              >
                <span>Вернуться на главную</span>
                <span className="text-[20px]">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
