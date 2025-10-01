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
  PhoneInput: ({ value, onChange, onValidationChange, placeholder, error }: {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean) => void;
    placeholder: string;
    error?: string;
  }) => (
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

describe('RequestPopup', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock
    (global.fetch as jest.Mock).mockClear();
  });

  it('не рендерится когда open=false', () => {
    render(<RequestPopup open={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Оставить заявку')).not.toBeInTheDocument();
  });

  it('рендерится когда open=true', () => {
    render(<RequestPopup open={true} onClose={mockOnClose} />);
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument();
    expect(screen.getByText('Просто заполните форму, и мы обсудим ваш проект в ближайшее время и уточним стоимость проекта')).toBeInTheDocument();
  });

  it('содержит все необходимые поля формы', () => {
    render(<RequestPopup open={true} onClose={mockOnClose} />);
    
    expect(screen.getByPlaceholderText('ФИО')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Название компании')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Телефон')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Описание задачи')).toBeInTheDocument();
    expect(screen.getByText('Приложить файл')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /оставить заявку/i })).toBeInTheDocument();
  });

  it('позволяет вводить данные в поля формы', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const fioInput = screen.getByPlaceholderText('ФИО');
    const companyInput = screen.getByPlaceholderText('Название компании');
    const emailInput = screen.getByPlaceholderText('Email');
    const descriptionInput = screen.getByPlaceholderText('Описание задачи');

    await user.type(fioInput, 'Иван Иванов');
    await user.type(companyInput, 'ООО Тест');
    await user.type(emailInput, 'test@example.com');
    await user.type(descriptionInput, 'Тестовое описание задачи');

    expect(fioInput).toHaveValue('Иван Иванов');
    expect(companyInput).toHaveValue('ООО Тест');
    expect(emailInput).toHaveValue('test@example.com');
    expect(descriptionInput).toHaveValue('Тестовое описание задачи');
  });

  it('показывает ошибки валидации при пустых полях', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Введите имя')).toBeInTheDocument();
      expect(screen.getByText('Введите название компании')).toBeInTheDocument();
      expect(screen.getByText('Некорректный email')).toBeInTheDocument();
      expect(screen.getByText('Введите корректный телефон')).toBeInTheDocument();
      expect(screen.getByText('Опишите задачу')).toBeInTheDocument();
      expect(screen.getByText('Необходимо согласие')).toBeInTheDocument();
    });
  });

  it('валидирует email формат', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });

    await user.type(emailInput, 'неправильный-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Некорректный email')).toBeInTheDocument();
    });
  });

  it('валидирует телефон через PhoneInput', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const phoneInput = screen.getByTestId('phone-input');
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });

    // Вводим неполный номер телефона
    await user.type(phoneInput, '123456789');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Введите корректный телефон')).toBeInTheDocument();
    });
  });

  it('требует согласия на обработку данных', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Необходимо согласие')).toBeInTheDocument();
    });
  });

  it('отключает кнопку отправки без согласия', () => {
    render(<RequestPopup open={true} onClose={mockOnClose} />);
    
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });
    expect(submitButton).toBeDisabled();
  });

  it('включает кнопку отправки после согласия', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const checkbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /оставить заявку/i });

    expect(submitButton).toBeDisabled();
    
    await user.click(checkbox);
    
    expect(submitButton).not.toBeDisabled();
  });

  it('закрывается при клике на кнопку закрытия', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText('Закрыть');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('закрывается при клике на overlay', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const overlay = screen.getByText('Оставить заявку').closest('.overlay');
    if (overlay) {
      await user.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('не закрывается при клике на сам popup', async () => {
    const user = userEvent.setup();
    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const popup = screen.getByText('Оставить заявку').closest('.popup');
    if (popup) {
      await user.click(popup);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('успешно отправляет форму с валидными данными', async () => {
    const user = userEvent.setup();
    
    // Mock успешного ответа от API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Заполняем форму
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание');
    
    // Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));
    
    // Отправляем форму
    await user.click(screen.getByRole('button', { name: /оставить заявку/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/submit-request', {
        method: 'POST',
        body: expect.any(FormData),
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Спасибо! Ваша заявка отправлена.')).toBeInTheDocument();
    });
  });

  it('обрабатывает ошибку при отправке формы', async () => {
    const user = userEvent.setup();
    
    // Mock ошибки от API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: false, error: 'Ошибка сервера' }),
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Заполняем форму
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание');
    
    // Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));
    
    // Отправляем форму
    await user.click(screen.getByRole('button', { name: /оставить заявку/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Ошибка отправки заявки:', 'Ошибка сервера');
    });

    consoleSpy.mockRestore();
  });

  it('обрабатывает сетевую ошибку', async () => {
    const user = userEvent.setup();
    
    // Mock сетевой ошибки
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Заполняем форму
    await user.type(screen.getByPlaceholderText('ФИО'), 'Иван Иванов');
    await user.type(screen.getByPlaceholderText('Название компании'), 'ООО Тест');
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByTestId('phone-input'), '1234567890');
    await user.type(screen.getByPlaceholderText('Описание задачи'), 'Тестовое описание');
    
    // Соглашаемся с условиями
    await user.click(screen.getByRole('checkbox'));
    
    // Отправляем форму
    await user.click(screen.getByRole('button', { name: /оставить заявку/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Ошибка при отправке заявки:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});

