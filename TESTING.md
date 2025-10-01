# Тестирование формы заявки

Этот документ описывает автотесты для формы заявки в проекте CyberChef.

## Структура тестов

### Unit тесты
- `src/components/organisms/__tests__/RequestPopup.test.tsx` - основные тесты компонента
- `src/components/organisms/__tests__/RequestPopup.fileUpload.test.tsx` - тесты загрузки файлов
- `src/components/organisms/__tests__/RequestPopup.integration.test.tsx` - интеграционные тесты
- `src/utils/__tests__/fileValidation.test.ts` - тесты валидации файлов
- `src/utils/__tests__/phoneMask.test.ts` - тесты маски телефона
- `src/app/api/submit-request/__tests__/route.test.ts` - тесты API endpoint

### E2E тесты
- `tests/e2e/request-form.spec.ts` - end-to-end тесты с Playwright

## Запуск тестов

### Unit тесты (Jest + React Testing Library)
```bash
# Запуск всех unit тестов
npm test

# Запуск в режиме наблюдения
npm run test:watch

# Запуск с покрытием кода
npm run test:coverage
```

### E2E тесты (Playwright)
```bash
# Запуск всех E2E тестов
npm run test:e2e

# Запуск с UI
npm run test:e2e:ui

# Запуск в headed режиме
npm run test:e2e:headed
```

## Покрытие тестами

### Компонент RequestPopup
- ✅ Рендеринг и отображение
- ✅ Валидация полей формы
- ✅ Обработка пользовательского ввода
- ✅ Загрузка и валидация файлов
- ✅ Отправка формы
- ✅ Обработка ошибок
- ✅ Закрытие формы

### Валидация
- ✅ Email формат
- ✅ Телефон (маска и валидация)
- ✅ Обязательные поля
- ✅ Согласие на обработку данных
- ✅ Размер и тип файлов

### API Endpoint
- ✅ Обработка FormData
- ✅ Обработка JSON
- ✅ Валидация данных
- ✅ Отправка email
- ✅ Обработка ошибок
- ✅ Поддержка файлов

### E2E сценарии
- ✅ Открытие/закрытие формы
- ✅ Заполнение и валидация
- ✅ Загрузка файлов
- ✅ Отправка формы
- ✅ Мобильная версия

## Тестовые данные

### Валидные данные для тестов
```javascript
const validFormData = {
  fio: 'Иван Иванов',
  company: 'ООО Тест',
  email: 'test@example.com',
  phone: '1234567890',
  description: 'Тестовое описание задачи'
};
```

### Валидные файлы
- `test.pdf` (application/pdf)
- `test.doc` (application/msword)
- `test.docx` (application/vnd.openxmlformats-officedocument.wordprocessingml.document)
- `test.txt` (text/plain)

### Невалидные файлы
- `test.jpg` (image/jpeg) - неподдерживаемый тип
- `large.pdf` (>20MB) - превышает размер

## Mock'и и заглушки

### API Mock
```javascript
// Успешный ответ
(global.fetch as jest.Mock).mockResolvedValueOnce({
  json: async () => ({ success: true }),
});

// Ошибка
(global.fetch as jest.Mock).mockResolvedValueOnce({
  json: async () => ({ success: false, error: 'Ошибка сервера' }),
});
```

### Nodemailer Mock
```javascript
jest.mock('nodemailer', () => ({
  createTransporter: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));
```

## Отладка тестов

### Просмотр DOM в тестах
```javascript
import { screen } from '@testing-library/react';

// Вывод всего DOM
screen.debug();

// Вывод конкретного элемента
screen.debug(screen.getByText('Оставить заявку'));
```

### Отладка E2E тестов
```bash
# Запуск в debug режиме
npx playwright test --debug

# Запуск конкретного теста
npx playwright test request-form.spec.ts --debug
```

## Непрерывная интеграция

Тесты автоматически запускаются при:
- Pull Request
- Push в main ветку
- Ручном запуске в CI/CD

## Добавление новых тестов

### Unit тест
1. Создайте файл `*.test.tsx` в папке `__tests__`
2. Импортируйте необходимые утилиты
3. Напишите тесты с описательными названиями
4. Используйте `describe` и `it` для группировки

### E2E тест
1. Добавьте тест в `tests/e2e/request-form.spec.ts`
2. Используйте `test.describe` для группировки
3. Применяйте `page.locator()` для поиска элементов
4. Используйте `expect()` для проверок

## Лучшие практики

1. **Изоляция тестов** - каждый тест должен быть независимым
2. **Очистка** - используйте `beforeEach` и `afterEach` для очистки
3. **Описательные названия** - тесты должны читаться как документация
4. **Mock'и** - изолируйте внешние зависимости
5. **Покрытие** - стремитесь к 100% покрытию критических путей
6. **Производительность** - тесты должны выполняться быстро

## Troubleshooting

### Частые проблемы

1. **Тесты падают из-за асинхронности**
   - Используйте `waitFor()` для ожидания элементов
   - Применяйте `await` для асинхронных операций

2. **Mock'и не работают**
   - Проверьте порядок импортов
   - Убедитесь, что mock'и определены до импорта модуля

3. **E2E тесты нестабильны**
   - Добавьте `await page.waitForLoadState()`
   - Используйте `page.waitForSelector()` для ожидания элементов

4. **Проблемы с файлами**
   - Убедитесь, что тестовые файлы существуют
   - Проверьте права доступа к файлам

