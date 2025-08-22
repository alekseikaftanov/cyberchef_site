'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {/* Фиолетовый card */}
        <div className="relative w-full max-w-[1880px] h-[860px] bg-[#6C1EFF] rounded-[40px] mx-2 sm:mx-auto flex items-center justify-center mt-5 mb-5 overflow-hidden">
          {/* Фоновое изображение */}
          <img
            src="/image_250.png"
            alt="Фоновое изображение"
            className="pointer-events-none select-none absolute left-1/2 top-1/2 w-[2840px] h-[1598px] object-cover opacity-20"
            style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'luminosity', zIndex: 1 }}
            aria-hidden
          />
          {/* Центрированный контент */}
          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-[685px]">
            {/* 404 big composition */}
            <div className="relative flex flex-row items-center justify-center w-full max-w-[616px] h-[214px] mb-2">
              {/* 4 */}
              <span className="font-montserrat font-extrabold text-[180px] leading-none text-white select-none" style={{lineHeight: '1', width: '193px', height: '214px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>4</span>
              {/* 0 (custom vector/ellipse) */}
              <span className="mx-2 flex items-center justify-center" style={{width: '189px', height: '214px'}}>
                <svg>
                  <use href="/pictures/404/404.svg" />
                </svg>
              </span>
              {/* 4 (reverse) */}
              <span className="font-montserrat font-extrabold text-[180px] leading-none text-white select-none" style={{lineHeight: '1', width: '193px', height: '214px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>4</span>
            </div>
            {/* Текст и кнопка */}
            <div className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <span className="font-montserrat font-bold text-[28px] sm:text-[24px] leading-[120%] tracking-[-0.06em] text-white text-center">
                  Ой-ой! Кажется, мы потерялись… 🧭
                </span>
                <span className="font-inter font-normal text-[20px] sm:text-[18px] leading-[150%] tracking-[-0.04em] text-[#F5F7FA] text-center opacity-80">
                  Вы попали на страницу, которой не существует — возможно, она уплыла в цифровое небытие или просто спряталась от нас
                </span>
              </div>
              <Link href="/" className="mt-4 flex flex-row items-center gap-2 px-5 py-4 bg-white rounded-[14px] shadow font-inter font-medium text-[20px] text-[#333] hover:bg-gray-100 transition cursor-pointer">
                <span>Вернуться на главную</span>
                <span className="text-[20px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 