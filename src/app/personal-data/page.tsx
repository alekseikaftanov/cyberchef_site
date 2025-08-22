'use client';

import { Header } from '@/components/organisms/Header';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PersonalDataText } from '@/lib/PersonalDataText';

export default function PersonalData() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen w-full bg-[#F5F7FA] pb-8 flex flex-col items-center">
      <Header />
      <div
        className="relative w-full max-w-[1240px] min-h-[600px] bg-white rounded-[40px] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[60px] py-6 sm:py-10 md:py-16 flex flex-col items-start gap-6 sm:gap-10 md:gap-16 mt-32 sm:mt-40 shadow-lg"
        style={{ boxSizing: 'border-box' }}
      >
        <button
          onClick={() => router.push('/')}
          className="mb-2 px-8 py-3 bg-[#F5F7FA] text-[#333] rounded-[20px] text-lg font-medium shadow hover:bg-gray-100 transition cursor-pointer"
        >
          ← Назад
        </button>
        
        <div className="w-full overflow-x-auto">
          <PersonalDataText />
        </div>
      </div>
    </div>
  );
}
