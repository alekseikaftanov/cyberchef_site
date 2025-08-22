# 🚀 SEO настройка для ТЕХВИЛЛ

## ✅ Что уже настроено:

### 1. **Мета-теги**
- Title: "ТЕХВИЛЛ. Закрываем задачи. Открываем будущее."
- Description: Подробное описание услуг
- Keywords: Расширенный список ключевых слов
- Language: `lang="ru"`

### 2. **Open Graph (для соцсетей)**
- Заголовки и описания для Facebook, VK, Telegram
- Изображения для превью
- Локализация: `ru_RU`

### 3. **Twitter Cards**
- Large image карточки
- Оптимизированные заголовки

### 4. **Структурированные данные (JSON-LD)**
- Schema.org разметка для организации
- Контактная информация
- Типы услуг

### 5. **Технические заголовки**
- X-Frame-Options: DENY
- X-DNS-Prefetch-Control: on
- DNS prefetch для Google Fonts

### 6. **Файлы для поисковиков**
- `robots.txt` - инструкции для роботов
- `sitemap.xml` - карта сайта
- `site.webmanifest` - PWA манифест

## 🔧 Что нужно настроить вручную:

### 1. **Верификация в поисковиках**

#### Google Search Console:
1. Перейдите на [Google Search Console](https://search.google.com/search-console)
2. Добавьте сайт `https://techvill.ru`
3. Скопируйте код верификации
4. Замените в `layout.tsx`:
   ```typescript
   verification: {
     google: "ВАШ_КОД_ВЕРИФИКАЦИИ",
   }
   ```

#### Yandex Webmaster:
1. Перейдите на [Yandex Webmaster](https://webmaster.yandex.ru)
2. Добавьте сайт `https://techvill.ru`
3. Скопируйте код верификации
4. Замените в `layout.tsx`:
   ```typescript
   verification: {
     yandex: "ВАШ_КОД_ВЕРИФИКАЦИИ",
   }
   ```

### 2. **Аналитика**

#### Google Analytics 4:
1. Создайте аккаунт в [Google Analytics](https://analytics.google.com)
2. Добавьте код отслеживания в `layout.tsx`

#### Yandex Metrika:
1. Создайте счетчик в [Yandex Metrika](https://metrika.yandex.ru)
2. Добавьте код отслеживания в `layout.tsx`

### 3. **Дополнительные SEO улучшения**

#### Скорость загрузки:
- Оптимизация изображений
- Lazy loading для изображений
- Минификация CSS/JS

#### Мобильная оптимизация:
- Responsive дизайн ✅
- Touch-friendly интерфейс ✅
- Быстрая загрузка на мобильных ✅

#### Локальное SEO:
- Google My Business
- Yandex Справочник
- Отзывы и рейтинги

## 📊 Мониторинг SEO:

### 1. **Инструменты для проверки:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [Yandex Webmaster](https://webmaster.yandex.ru/)

### 2. **Ключевые метрики:**
- Core Web Vitals
- Время загрузки страницы
- Индексация в поисковиках
- Позиции по ключевым запросам

## 🎯 Рекомендации по контенту:

### 1. **Ключевые фразы для продвижения:**
- "разработка мобильных приложений москва"
- "создание сайтов под ключ"
- "веб-разработка компании"
- "IT-консалтинг москва"
- "разработка программного обеспечения"

### 2. **Типы контента:**
- Кейсы проектов
- Технические статьи
- Новости компании
- Обзоры технологий

## 🔍 Проверка индексации:

После настройки проверьте:
1. `site:techvill.ru` в Google
2. `site:techvill.ru` в Yandex
3. Наличие sitemap в поисковиках
4. Отсутствие ошибок в Search Console

---

**Важно:** После внесения изменений в коды верификации пересоберите проект командой `npm run build`
