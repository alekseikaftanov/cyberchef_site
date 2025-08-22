'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-black">
      <div className="max-w-[1440px] mx-auto px-32 pt-20 pb-0">
        <div className="flex flex-col gap-[100px]">
          
          {/* Top Section - Contacts and Collaboration */}
          <div className="flex flex-row items-end pt-10 gap-4 border-t border-white/25">
            {/* Left Column - Title and Description */}
            <div className="flex flex-col gap-4 w-[690px] h-[170px]">
              {/* Title with Icon */}
              <div className="flex items-center gap-1.5 w-[284px] h-[22px]">
                <Image
                  src="/pictures/footer/icon_logo_white.svg"
                  alt="Кибершеф"
                  width={8.46}
                  height={10}
                  className="w-[8.46px] h-[10px]"
                />
                <span className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
                  Контакты и сотрудничество
                </span>
              </div>
              
              {/* Main Description */}
              <div className="w-[690px] h-[132px]">
                <h2 className="text-white font-[var(--font-inter)] font-medium text-[40px] leading-[110%] tracking-[-0.02em]">
                  Поработайте с ключевой компанией в сфере автоматизации кулинарии.
                </h2>
              </div>
            </div>
            
            {/* Right Column - Email */}
            <div className="w-[478px] h-[170px] relative">
              <a 
                href="mailto:business@cyberchef.com"
                className="absolute right-0 bottom-0 w-[478px] h-[44px] text-white font-[var(--font-inter)] font-medium text-[40px] leading-[110%] tracking-[-0.02em] underline opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              >
                info@cyberchief.ru
              </a>
            </div>
          </div>
          
          {/* Middle Section - Navigation and Company Info */}
          <div className="flex flex-row justify-between items-start pt-6 gap-4 border-t border-white/25">
            {/* Left Column - Navigation Links */}
            <div className="flex flex-col justify-center items-start gap-4 w-[184px] h-[156px]">
              <Link href="#about" className="text-white font-[var(--font-inter)] font-normal text-xl leading-[135%] tracking-[-0.02em] opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
                О компании
              </Link>
              <Link href="#services" className="text-white font-[var(--font-inter)] font-normal text-xl leading-[135%] tracking-[-0.02em] opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
                Услуги
              </Link>
              <Link href="#contacts" className="text-white font-[var(--font-inter)] font-normal text-xl leading-[135%] tracking-[-0.02em] opacity-50 hover:opacity-80 transition-opacity cursor-pointer">
                Контакты
              </Link>
            </div>
            
            {/* Middle Column - Company Details */}
            <div className="flex flex-col justify-center items-start gap-3 w-[284px] h-[234px]">
              <h3 className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em] opacity-80">
                О компании
              </h3>
              <p className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[44px]">
                Общество с ограниченной ответственностью "КиберШеф"
              </p>
              <p className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[66px]">
                Основной ОКВЭД: 62.01 - Разработка компьютерного программного обеспечения
              </p>
              <p className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[66px]">
                123592, г. Москва, вн.тер.г., мун. округ Строгино, ул. Кулакова, д. 20, к. 1, помещ. 8/1
              </p>
            </div>
            
            {/* Right Column - Legal Information */}
            <div className="flex flex-col justify-center items-start gap-3 w-[284px] h-[168px]">
              <h3 className="text-white font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em] opacity-80">
                Правовая информация
              </h3>
              <p className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[44px]">
                ИНН: 9734016610
              </p>
              <p className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[44px]">
                ОГРН: 1257700361621
              </p>
              <Link 
                href="/personal-data?from=contacts" 
                className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[44px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                Согласие на обработку персональных данных
              </Link>
              <Link 
                href="/privacy-policy?from=contacts" 
                className="text-white font-[var(--font-inter)] font-normal text-base leading-[135%] tracking-[-0.02em] opacity-50 w-[284px] h-[22px] hover:opacity-80 transition-opacity cursor-pointer"
              >
                Политика конфиденциальности
              </Link>
            </div>
          </div>
          
          {/* Bottom Section - Large Logo */}
          <div className="w-[1184px] h-[203px] border-t border-white/25 pt-6">
            <div className="flex justify-center items-center h-full">
              <Image
                src="/pictures/footer/logo_footer.svg"
                alt="Кибершеф"
                width={1184}
                height={203}
                className="opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
