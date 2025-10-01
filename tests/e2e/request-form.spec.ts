import { test, expect } from '@playwright/test';

test.describe('Форма заявки', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('открывает форму заявки при клике на кнопку', async ({ page }) => {
    // Ищем кнопку для открытия формы заявки
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Проверяем, что форма открылась
    await expect(page.locator('text=Оставить заявку')).toBeVisible();
    await expect(page.locator('input[placeholder="ФИО"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Название компании"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Телефон"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Описание задачи"]')).toBeVisible();
  });

  test('закрывает форму при клике на кнопку закрытия', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Проверяем, что форма открылась
    await expect(page.locator('text=Оставить заявку')).toBeVisible();

    // Закрываем форму
    const closeButton = page.locator('[aria-label="Закрыть"]');
    await closeButton.click();

    // Проверяем, что форма закрылась
    await expect(page.locator('text=Оставить заявку')).not.toBeVisible();
  });

  test('закрывает форму при клике на overlay', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Проверяем, что форма открылась
    await expect(page.locator('text=Оставить заявку')).toBeVisible();

    // Кликаем на overlay (вне формы)
    await page.locator('.overlay').click({ position: { x: 10, y: 10 } });

    // Проверяем, что форма закрылась
    await expect(page.locator('text=Оставить заявку')).not.toBeVisible();
  });

  test('показывает ошибки валидации при пустых полях', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Отправляем пустую форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем ошибки валидации
    await expect(page.locator('text=Введите имя')).toBeVisible();
    await expect(page.locator('text=Введите название компании')).toBeVisible();
    await expect(page.locator('text=Некорректный email')).toBeVisible();
    await expect(page.locator('text=Введите корректный телефон')).toBeVisible();
    await expect(page.locator('text=Опишите задачу')).toBeVisible();
  });

  test('валидирует email формат', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Заполняем неправильный email
    await page.locator('input[placeholder="Email"]').fill('неправильный-email');

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Отправляем форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем ошибку email
    await expect(page.locator('text=Некорректный email')).toBeVisible();
  });

  test('валидирует телефон', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Заполняем неполный номер телефона
    await page.locator('input[placeholder="Телефон"]').fill('123456789');

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Отправляем форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем ошибку телефона
    await expect(page.locator('text=Введите корректный телефон')).toBeVisible();
  });

  test('требует согласия на обработку данных', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Заполняем форму
    await page.locator('input[placeholder="ФИО"]').fill('Иван Иванов');
    await page.locator('input[placeholder="Название компании"]').fill('ООО Тест');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Телефон"]').fill('1234567890');
    await page.locator('textarea[placeholder="Описание задачи"]').fill('Тестовое описание');

    // НЕ соглашаемся с условиями
    // Отправляем форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем ошибку согласия
    await expect(page.locator('text=Необходимо согласие')).toBeVisible();
  });

  test('отключает кнопку отправки без согласия', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Проверяем, что кнопка отключена
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await expect(submitButton).toBeDisabled();

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Проверяем, что кнопка включена
    await expect(submitButton).toBeEnabled();
  });

  test('успешно отправляет форму с валидными данными', async ({ page }) => {
    // Mock API response
    await page.route('**/api/submit-request', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Заявка успешно отправлена' }),
      });
    });

    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Заполняем форму
    await page.locator('input[placeholder="ФИО"]').fill('Иван Иванов');
    await page.locator('input[placeholder="Название компании"]').fill('ООО Тест');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Телефон"]').fill('1234567890');
    await page.locator('textarea[placeholder="Описание задачи"]').fill('Тестовое описание задачи');

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Отправляем форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем успешное сообщение
    await expect(page.locator('text=Спасибо! Ваша заявка отправлена.')).toBeVisible();

    // Проверяем, что форма закрылась через 1.5 секунды
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Оставить заявку')).not.toBeVisible();
  });

  test('обрабатывает ошибку при отправке формы', async ({ page }) => {
    // Mock API error response
    await page.route('**/api/submit-request', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Ошибка сервера' }),
      });
    });

    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Заполняем форму
    await page.locator('input[placeholder="ФИО"]').fill('Иван Иванов');
    await page.locator('input[placeholder="Название компании"]').fill('ООО Тест');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Телефон"]').fill('1234567890');
    await page.locator('textarea[placeholder="Описание задачи"]').fill('Тестовое описание задачи');

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Отправляем форму
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await submitButton.click();

    // Проверяем, что форма осталась открытой (нет сообщения об успехе)
    await expect(page.locator('text=Спасибо! Ваша заявка отправлена.')).not.toBeVisible();
    await expect(page.locator('text=Оставить заявку')).toBeVisible();
  });

  test('позволяет загружать файл', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Создаем тестовый файл
    const filePath = 'test-file.pdf';
    await page.evaluate(() => {
      const file = new File(['test content'], 'test-file.pdf', { type: 'application/pdf' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      return dataTransfer;
    });

    // Загружаем файл
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Проверяем, что файл отображается
    await expect(page.locator('text=test-file.pdf')).toBeVisible();
  });

  test('показывает ошибку при загрузке неподдерживаемого файла', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Создаем неподдерживаемый файл
    const filePath = 'test-file.jpg';
    await page.evaluate(() => {
      const file = new File(['test content'], 'test-file.jpg', { type: 'image/jpeg' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      return dataTransfer;
    });

    // Загружаем файл
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Проверяем ошибку
    await expect(page.locator('text=Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).toBeVisible();
  });

  test('позволяет удалить загруженный файл', async ({ page }) => {
    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Загружаем файл
    const filePath = 'test-file.pdf';
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Проверяем, что файл отображается
    await expect(page.locator('text=test-file.pdf')).toBeVisible();

    // Удаляем файл
    const removeButton = page.locator('button:has-text("×")');
    await removeButton.click();

    // Проверяем, что файл удален
    await expect(page.locator('text=test-file.pdf')).not.toBeVisible();
  });

  test('работает на мобильных устройствах', async ({ page }) => {
    // Устанавливаем мобильный viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Открываем форму
    const requestButton = page.locator('text=Оставить заявку').first();
    await requestButton.click();

    // Проверяем, что форма открылась
    await expect(page.locator('text=Оставить заявку')).toBeVisible();

    // Заполняем форму
    await page.locator('input[placeholder="ФИО"]').fill('Иван Иванов');
    await page.locator('input[placeholder="Название компании"]').fill('ООО Тест');
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Телефон"]').fill('1234567890');
    await page.locator('textarea[placeholder="Описание задачи"]').fill('Тестовое описание');

    // Соглашаемся с условиями
    await page.locator('input[type="checkbox"]').check();

    // Проверяем, что кнопка активна
    const submitButton = page.locator('button:has-text("Оставить заявку")');
    await expect(submitButton).toBeEnabled();
  });
});

