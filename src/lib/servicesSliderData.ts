export interface ServiceSliderItem {
  key: string;
  title: string;
  text: string;
  bgColor: string;
  textColor: string;
  icon: string;
}

export const servicesSliderData: ServiceSliderItem[] = [
  {
    key: 'rec',
    title: 'Рекомендательные системы',
    text: 'Разрабатываем персонализированные рекомендации для ваших пользователей на основе их поведения и предпочтений',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/star_icon.svg',
  },
  {
    key: 'fraud',
    title: 'AI‑Антифрод система',
    text: 'Алгоритмы на основе ИИ автоматически выявляют мошеннические операции, минимизируя финансовые риски и защищая ваш бизнес от fraudulent-активности',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/robot_icon.svg',
  },
  {
    key: 'reviews',
    title: 'AI‑Нейроанализ отзывов',
    text: 'Анализируем отзывы с помощью AI, определяя тональность и ключевые темы. Это поможет вам улучшать сервис на основе реальной обратной связи клиентов',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/text_icon.svg',
  },
  {
    key: 'data',
    title: 'Корпоративные хранилища данных',
    text: 'Создаем надежные и безопасные хранилища для ваших данных с удобным доступом',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/db_icon.svg',
  },
  {
    key: 'analytics',
    title: 'Клиентская аналитика',
    text: 'Проводим глубокий анализ поведения ваших клиентов: от воронки продаж до прогнозирования LTV',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/analitics_icon.svg',
  },
  {
    key: 'search',
    title: 'Умный поиск',
    text: 'Внедряем интеллектуальный поиск с ИИ, который понимает естественный язык и выдает релевантные результаты, улучшая пользовательский опыт',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/search_icon.svg',
  },
  {
    key: 'demand',
    title: 'Предсказание спроса',
    text: 'Прогнозируем спрос на ваши товары и услуги с учетом сезонности, трендов и внешних факторов',
    bgColor: 'bg-[#333]',
    textColor: 'text-white',
    icon: '/pictures/servicesSlider/predective_icon.svg',
  },
]; 