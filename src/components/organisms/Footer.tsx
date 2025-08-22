'use client';

import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#F5F7FA] border-t border-gray-200">
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Section - Logo, Copyright, Accreditation, Links */}
          <div className="flex flex-col space-y-4">
            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/pictures/footer/logo-black.svg" 
                alt="Техвилл" 
                width={120} 
                height={40} 
                priority 
              />
            </div>
            
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © ООО Технологии Вкусвилл, 2025
            </p>
            {/* Accreditation */}
            <p className="text-gray-500 text-sm">
            Аккредитованная ИТ-компания (номер в реестре 13167 от 18.12.2020)
            </p>
            <p className="text-gray-500 text-sm"> Основной ОКВЭД: 62.01 - Разработка компьютерного
программного обеспечения</p>
            
            {/* Links */}
            <div className="flex flex-col space-y-2">
              <Link 
                href="/privacy-policy" 
                className="text-purple-600 underline hover:text-purple-700 transition-colors text-sm flex items-center"
              >
                Политика конфиденциальности →
              </Link>
              <Link 
                href="/personal-data" 
                className="text-purple-600 underline hover:text-purple-700 transition-colors text-sm flex items-center"
              >
                Согласие на обработку персональных данных →
              </Link>
            </div>
          </div>
          
          {/* Middle Section - Navigation */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <nav className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8">
              <Link 
                href="#services" 
                className="text-[#333] font-sans hover:text-gray-600 transition-colors text-base"
              >
                Услуги 
              </Link>
              <Link 
                href="#portfolio" 
                className="text-[#333] font-sans hover:text-gray-600 transition-colors text-base"
              >
                Портфолио
              </Link>
              <Link 
                href="#about" 
                className="text-[#333] font-sans hover:text-gray-600 transition-colors text-base"
              >
                О нас
              </Link>
              <Link 
                href="#contacts" 
                className="text-[#333] font-sans hover:text-gray-600 transition-colors text-base"
              >
                Контакты
              </Link>
            </nav>
          </div>
          
          {/* Right Section - Contact Information */}
          <div className="flex flex-col space-y-2 text-sm text-gray-500">
            <p>ИНН: 7751014313</p>
            <p>ОГРН: 5157746165605</p>  
            <p>
              Номер телефона: {' '}
              <a 
                href="tel:+74951346363" 
                className="text-purple-600 hover:text-purple-700 underline transition-colors cursor-pointer"
              >
                +7 (495) 134-63-63
              </a>
            </p> 
            <p>
              Адрес электронной почты: {' '}
              <a 
                href="mailto:info@techvill.ru" 
                className="text-purple-600 hover:text-purple-700 underline transition-colors cursor-pointer"
              >
                info@techvill.ru
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
