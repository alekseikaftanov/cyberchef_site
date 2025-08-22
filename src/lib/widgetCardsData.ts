export interface WidgetCardData {
  key: string;
  bgColor: string;
  textColor: string;
  iconBorderColor?: 'white' | 'black';
  icon: string;
  title: string;
  text: string;
  bottomImage?: string;
  className?: string;
}

export const widgetCardsData: WidgetCardData[] = [
  {
    key: 'mobile',
    bgColor: 'bg-[#6C1EFF]',
    textColor: 'text-white',
    icon: '/pictures/ourProducts/mobile.svg',
    title: 'Разработка мобильных приложений',
    text: 'Создаем уникальные приложения для крупного и среднего бизнеса, интегрированные с вашими IT-системами.',
    bottomImage: '/pictures/ourProducts/mobile-picture.svg',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[500px] rounded-[40px]',
  },
  {
    key: '1c-integration',
    bgColor: 'bg-white',
    textColor: 'text-[#333]',
    icon: '/pictures/ourProducts/1С.svg',
    title: '1C-интеграция',
    text: 'Интеграция бизнес-процессов и автоматизация учёта с помощью 1C.',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[270px] rounded-[40px] shadow-sm',
  },
  {
    key: 'support',
    bgColor: 'bg-white',
    textColor: 'text-[#333]',
    iconBorderColor: 'black',
    icon: '/pictures/ourProducts/support.svg',
    title: 'Поддержка и развитие мобильных приложений',
    text: 'Делаем ваше приложение идеальным для любых гаджетов',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[270px] rounded-[40px]',
  },
  {
    key: 'web',
    bgColor: 'bg-[#333333]',
    textColor: 'text-white',
    icon: '/pictures/ourProducts/sites.svg',
    title: 'Веб-приложения и сайты',
    text: 'Создаем современные сайты и веб-сервисы для бизнеса любого масштаба, с уникальным дизайном и высокой производительностью.',
    bottomImage: '/pictures/ourProducts/web-picture.svg',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[500px] rounded-[40px]',
  },
  {
    key: 'design',
    bgColor: 'bg-[#A5F04B]',
    textColor: 'text-[#333]',
    iconBorderColor: 'white',
    icon: '/pictures/ourProducts/design.svg',
    title: 'Дизайн и проектирование',
    text: 'UI/UX дизайн. Создаем и улучшаем дизайн мобильных и web–приложений, сайтов, сервисов.',
    bottomImage: '/pictures/ourProducts/ux-ui-picture.svg',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[500px] rounded-[40px]',
  },
  {
    key: 'devops',
    bgColor: 'bg-white',
    textColor: 'text-[#333]',
    iconBorderColor: 'black',
    icon: '/pictures/ourProducts/devops.svg',
    title: 'Devops',
    text: 'Непрерывная интеграция и непрерывная поставка программного обеспечения, автоматизация DevOps.',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[400px] h-[270px] rounded-[40px]',
  },
  {
    key: 'automation',
    bgColor: 'bg-white',
    textColor: 'text-[#333]',
    iconBorderColor: 'black',
    icon: '/pictures/ourProducts/auromatization.svg',
    title: 'Автоматизация бизнес-процессов',
    text: 'Документооборот, отраслевые учетные системы, банковские системы, риск-менеджмент, CRM и многое другое',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[610px] h-[258px] rounded-[40px]',
  },
  {
    key: 'consulting',
    bgColor: 'bg-white',
    textColor: 'text-[#333]',
    iconBorderColor: 'black',
    icon: '/pictures/ourProducts/consulting.svg',
    title: 'Консалтинг и обучение',
    text: 'Консультации в области разработки программного обеспечения, проектирование архитектуры, анализ существующего кода, организация эффективной работы по Agile',
    className: 'flex flex-col items-start p-[30px] gap-4 w-[610px] h-[258px] rounded-[40px]',
  },
]; 