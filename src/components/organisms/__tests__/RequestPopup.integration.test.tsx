import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RequestPopup } from '../RequestPopup';

// Mock CSS modules
jest.mock('../RequestPopup.module.css', () => ({
  overlay: 'overlay',
  popup: 'popup',
  closeBtn: 'closeBtn',
  closeIcon: 'closeIcon',
  headerBlock: 'headerBlock',
  videoBackground: 'videoBackground',
  backgroundVideo: 'backgroundVideo',
  videoOverlay: 'videoOverlay',
  headerContent: 'headerContent',
  headerRow: 'headerRow',
  title: 'title',
  subtitle: 'subtitle',
  form: 'form',
  row: 'row',
  inputWrap: 'inputWrap',
  input: 'input',
  textareaWrap: 'textareaWrap',
  textarea: 'textarea',
  fileRow: 'fileRow',
  fileLabel: 'fileLabel',
  fileBtn: 'fileBtn',
  fileIcon: 'fileIcon',
  fileInfo: 'fileInfo',
  fileRemove: 'fileRemove',
  agreeRow: 'agreeRow',
  checkboxWrap: 'checkboxWrap',
  checkbox: 'checkbox',
  agreeText: 'agreeText',
  submitRow: 'submitRow',
  submitBtn: 'submitBtn',
  arrow: 'arrow',
  error: 'error',
  successMsg: 'successMsg',
}));

// Mock PhoneInput component
jest.mock('@/components/atoms/PhoneInput', () => ({
  PhoneInput: ({ value, onChange, onValidationChange, placeholder, error }: any) => (
    <input
      data-testid="phone-input"
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => onValidationChange && onValidationChange(value.length === 10)}
      placeholder={placeholder}
      style={{ borderColor: error ? '#f00' : 'transparent' }}
    />
  ),
}));

// Mock file validation utils
jest.mock('@/utils/fileValidation', () => ({
  validateFile: jest.fn((file) => {
    if (file.size > 20 * 1024 * 1024) {
      return { isValid: false, error: 'Размер файла не должен превышать 20MB' };
    }
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    if (!hasValidExtension) {
      return { isValid: false, error: 'Поддерживаются только файлы: PDF, DOC, DOCX, TXT' };
    }
    return { isValid: true };
  }),
  formatFileSize: jest.fn((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }),
}));

describe('RequestPopup - Integration Tests', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('полный сценарий: открытие, заполнение, загрузка файла, отправка и закрытие', async () => {
    const user = userEvent.setup();
    
    // Mock успешного ответа от API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    const { rerender } = render(<RequestPopup open={false} onClose={mockOnClose} />);

    // 1. Проверяем, что форма не отображается
    expect(screen.queryByText('Оставить заявку')).not.toBeInTheDocument();

    // 2. Открываем форму
    rerender(<RequestPopup open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();

    // 3. Заполняем все поля
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание задачи');

    // 4. Загружаем файл
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    // 5. Проверяем, что файл отображается
    expect(screen.getByText('test.pdf')).toBeInTheDocument();

    // 6. Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));

    // 7. Проверяем, что кнопка активна
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    expect(submitButton).toBeEnabled();

    // 8. Отправляем форму
    await user.click(submitButton);

    // 9. Проверяем, что API был вызван
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/submit-request', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    // 10. Проверяем успешное сообщение
    await waitFor(() => {
      expect(screen.getByText('Спасибо! Ваша заявка отправлена.')).toBeInTheDocument();
    });

    // 11. Ждем автоматического закрытия формы
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('сценарий с ошибками валидации и их исправлением', async () => {
    const user = userEvent.setup();
    
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // 1. Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));

    // 2. Пытаемся отправить пустую форму
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    await user.click(submitButton);

    // 3. Проверяем ошибки валидации
    await waitFor(() => {
      expect(screen.getByText('Введите имя')).toBeInTheDocument();
      expect(screen.getByText('Введите название компании')).toBeInTheDocument();
      expect(screen.getByText('Некорректный email')).toBeInTheDocument();
      expect(screen.getByText('Введите корректный телефон')).toBeInTheDocument();
      expect(screen.getByText('Опишите задачу')).toBeInTheDocument();
    });

    // 4. Заполняем поля с ошибками
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание');

    // 5. Отправляем форму снова
    await user.click(submitButton);

    // 6. Проверяем, что ошибки исчезли
    await waitFor(() => {
      expect(screen.queryByText('Введите имя')).not.toBeInTheDocument();
      expect(screen.queryByText('Введите название компании')).not.toBeInTheDocument();
      expect(screen.queryByText('Некорректный email')).not.toBeInTheDocument();
      expect(screen.queryByText('Введите корректный телефон')).not.toBeInTheDocument();
      expect(screen.queryByText('Опишите задачу')).not.toBeInTheDocument();
    });
  });

  it('сценарий с загрузкой невалидного файла и его заменой', async () => {
    const user = userEvent.setup();
    
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // 1. Загружаем невалидный файл
    const invalidFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, invalidFile);

    // 2. Проверяем ошибку
    expect(screen.getByText('Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).toBeInTheDocument();

    // 3. Загружаем валидный файл
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    await user.upload(fileInput, validFile);

    // 4. Проверяем, что ошибка исчезла и файл отображается
    expect(screen.queryByText('Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).not.toBeInTheDocument();
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('сценарий с удалением файла и повторной загрузкой', async () => {
    const user = userEvent.setup();
    
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // 1. Загружаем файл
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    // 2. Проверяем, что файл отображается
    expect(screen.getByText('test.pdf')).toBeInTheDocument();

    // 3. Удаляем файл
    const removeButton = screen.getByRole('button', { name: /×/i });
    await user.click(removeButton);

    // 4. Проверяем, что файл удален
    expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();

    // 5. Загружаем файл снова
    await user.upload(fileInput, validFile);

    // 6. Проверяем, что файл снова отображается
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('сценарий с ошибкой API и повторной отправкой', async () => {
    const user = userEvent.setup();
    
    // Mock ошибки от API
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        json: async () => ({ success: true }),
      });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // 1. Заполняем форму
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание');
    
    // 2. Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));
    
    // 3. Отправляем форму (первая попытка - ошибка)
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    await user.click(submitButton);

    // 4. Проверяем, что ошибка была залогирована
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Ошибка при отправке заявки:', expect.any(Error));
    });

    // 5. Проверяем, что форма осталась открытой
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();

    // 6. Отправляем форму снова (вторая попытка - успех)
    await user.click(submitButton);

    // 7. Проверяем успешное сообщение
    await waitFor(() => {
      expect(screen.getByText('Спасибо! Ваша заявка отправлена.')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('сценарий с множественными открытиями и закрытиями формы', async () => {
    const user = userEvent.setup();
    
    const { rerender } = render(<RequestPopup open={false} onClose={mockOnClose} />);

    // 1. Открываем форму
    rerender(<RequestPopup open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();

    // 2. Закрываем через кнопку
    const closeButton = screen.getByLabelText('Закрыть');
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // 3. Открываем снова
    rerender(<RequestPopup open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();

    // 4. Закрываем через overlay
    const overlay = screen.getByText('Оставить заявку').closest('.overlay');
    if (overlay) {
      await user.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(2);
    }

    // 5. Открываем в третий раз
    rerender(<RequestPopup open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();

    // 6. Проверяем, что форма работает корректно
    await user.type(screen.getByPlaceholderText('ФИО'), 'Тест');
    expect(screen.getByPlaceholderText('ФИО')).toHaveValue('Тест');
  });
});

