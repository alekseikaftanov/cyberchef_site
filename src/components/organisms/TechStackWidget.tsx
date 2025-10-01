'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';

interface TechStackWidgetProps {
  className?: string;
}

interface Technology {
  id: number;
  name: string;
  icon: string;
}

export const TechStackWidget: React.FC<TechStackWidgetProps> = ({ className }) => {
  const technologies: Technology[] = [
    {
      id: 1,
      name: 'Swift',
      icon: '/pictures/stack/swift.svg'
    },
    {
      id: 2,
      name: 'C++',
      icon: '/pictures/stack/С.svg'
    },
    {
      id: 3,
      name: 'Vue',
      icon: '/pictures/stack/vue.svg'
    },
    {
      id: 4,
      name: 'Kotlin',
      icon: '/pictures/stack/kotlin.svg'
    },
    {
      id: 5,
      name: 'React',
      icon: '/pictures/stack/react.svg'
    },
    {
      id: 6,
      name: 'Flutter',
      icon: '/pictures/stack/flutter.svg'
    },
    {
      id: 7,
      name: 'Python',
      icon: '/pictures/stack/python.svg'
    },
    {
      id: 8,
      name: 'Jenkins',
      icon: '/pictures/stack/jenkins.svg'
    },
    {
      id: 9,
      name: 'GitLab',
      icon: '/pictures/stack/gitlab.svg'
    }
  ];

  return (
    <section className={cn("w-full bg-white py-16 sm:py-20 lg:py-[120px] px-4 sm:px-8 md:px-16 lg:px-32", className)}>
      <div className="max-w-[1440px] mx-auto">
        
        {/* Внутренний контейнер с границей сверху */}
        <div className="flex flex-col lg:flex-row items-start pt-10 gap-4 lg:gap-4 w-full lg:w-[1184px] min-h-[343px] border-t border-black/10">
          
          {/* Левая колонка - Заголовок "Технологии" */}
          <div className="flex items-center gap-1.5 w-full lg:w-[284px] h-[22px]">
            <Image
              src="/pictures/about/icon_logo.svg"
              alt="Кибершеф"
              width={11}
              height={12}
              className="w-[8.46px] h-[10px]"
            />
            <h2 className="text-black font-[var(--font-inter)] font-medium text-base leading-[135%] tracking-[-0.04em]">
              Технологии
            </h2>
          </div>

          {/* Правая колонка - Основной контент */}
          <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-[884px] min-h-[303px]">
            
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[884px] min-h-[95px]">
              <h3 className="text-black font-[var(--font-inter)] font-medium text-2xl sm:text-3xl lg:text-[40px] leading-[110%] tracking-[-0.02em] w-full lg:w-[884px] min-h-[44px]">
                Универсальный технологический стек
              </h3>
              
              <p className="text-black/80 font-[var(--font-inter)] font-normal text-lg sm:text-xl lg:text-[20px] leading-[135%] tracking-[-0.02em] w-full lg:w-[884px] min-h-[27px]">
                Идём в ногу со временем и используем современные технологии
              </p>
            </div>

            {/* Карточки технологий */}
            <div className="flex flex-wrap items-start gap-2 sm:gap-3 lg:gap-2 w-full lg:w-[884px] min-h-[168px]">
              {technologies.map((tech) => (
                <div 
                  key={tech.id}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={tech.name === 'Swift' ? 139 :
                           tech.name === 'C++' ? 133 :
                           tech.name === 'Vue' ? 128 :
                           tech.name === 'Kotlin' ? 143 :
                           tech.name === 'React' ? 145 :
                           tech.name === 'Flutter' ? 152 :
                           tech.name === 'Python' ? 157 :
                           tech.name === 'Jenkins' ? 162 :
                           tech.name === 'GitLab' ? 153 : 80}
                    height={80}
                    className="object-contain w-auto h-12 sm:h-16 lg:h-20"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackWidget;
