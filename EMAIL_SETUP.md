# Настройка отправки писем через Nodemailer

## 1. Создание файла .env.local

Создайте файл `.env.local` в корне проекта со следующими переменными:

```env
# SMTP настройки для отправки писем
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Email для получения уведомлений о новых заявках
NOTIFICATION_EMAIL=your-notification-email@example.com
```

## 2. Настройка Gmail (рекомендуется)

### Для Gmail:
1. Включите двухфакторную аутентификацию
2. Создайте пароль приложения:
   - Перейдите в настройки Google аккаунта
   - Безопасность → Двухэтапная аутентификация → Пароли приложений
   - Создайте новый пароль для "Почта"
3. Используйте этот пароль в `SMTP_PASS`

### Для других провайдеров:
- **Yandex**: `smtp.yandex.ru:465` (secure: true)
- **Mail.ru**: `smtp.mail.ru:465` (secure: true)
- **Outlook**: `smtp-mail.outlook.com:587`

## 3. Текущие настройки SMTP для Tehvill

### Настройки для techvillsite@automacon.ru:
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=techvillsite@automacon.ru
SMTP_PASS=u48N1VAxf2AD@
SMTP_FROM=techvillsite@automacon.ru
NOTIFICATION_EMAIL=techvillsite@automacon.ru
SMTP_SECURE=true

# Дополнительные адреса для копий (через запятую)
CC_EMAILS=kafa@automacon.ru,info@techvill.ru
```

### Доступ к почте через браузер:
- **URL:** https://360.yandex.ru/mail/
- **Логин:** techvillsite@automacon.ru
- **Пароль:** u48N1VAxf2AD@

### Как работают копии:
- **Основной получатель:** `NOTIFICATION_EMAIL` - получает письмо в поле "Кому"
- **Копии:** `CC_EMAILS` - получают копию письма в поле "Копия"
- **Отправитель:** `SMTP_FROM` - адрес, с которого отправляется письмо
- **Формат:** несколько адресов указываются через запятую без пробелов

### Альтернативные настройки SMTP

#### Yandex (общий пример):
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-app-password
SMTP_FROM=your-email@yandex.ru
NOTIFICATION_EMAIL=your-notification-email@example.com
```

### Mail.ru:
```env
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_USER=your-email@mail.ru
SMTP_PASS=your-app-password
SMTP_FROM=your-email@mail.ru
NOTIFICATION_EMAIL=your-notification-email@example.com
```

## 4. Тестирование

После настройки переменных окружения:

1. Запустите проект: `npm run dev`
2. Откройте форму заявки на сайте
3. Заполните и отправьте тестовую заявку
4. Проверьте, что письмо пришло на указанный `NOTIFICATION_EMAIL`

## 5. Безопасность

- Никогда не коммитьте `.env.local` в git
- Используйте пароли приложений, а не обычные пароли
- Регулярно обновляйте пароли приложений
- Рассмотрите использование сервисов типа SendGrid для production

## 6. Troubleshooting

### Ошибка "Invalid login":
- Проверьте правильность email и пароля
- Убедитесь, что используете пароль приложения, а не обычный пароль

### Ошибка "Connection timeout":
- Проверьте правильность SMTP_HOST и SMTP_PORT
- Убедитесь, что провайдер не блокирует подключения

### Письма не приходят:
- Проверьте папку "Спам"
- Убедитесь, что `NOTIFICATION_EMAIL` указан правильно
- Проверьте логи сервера на наличие ошибок 