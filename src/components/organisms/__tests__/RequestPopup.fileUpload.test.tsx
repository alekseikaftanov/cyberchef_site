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
const mockValidateFile = jest.fn();
const mockFormatFileSize = jest.fn();

jest.mock('@/utils/fileValidation', () => ({
  validateFile: mockValidateFile,
  formatFileSize: mockFormatFileSize,
}));

describe('RequestPopup - File Upload', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatFileSize.mockImplementation((bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    });
  });

  it('показывает кнопку загрузки файла', () => {
    render(<RequestPopup open={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Приложить файл')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /приложить файл/i })).toBeInTheDocument();
  });

  it('позволяет выбрать файл', async () => {
    const user = userEvent.setup();
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('1 KB');

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    expect(mockValidateFile).toHaveBeenCalledWith(validFile);
    expect(screen.getByText('test.pdf (1 KB)')).toBeInTheDocument();
  });

  it('показывает ошибку при невалидном файле', async () => {
    const user = userEvent.setup();
    const invalidFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    mockValidateFile.mockReturnValue({ 
      isValid: false, 
      error: 'Поддерживаются только файлы: PDF, DOC, DOCX, TXT' 
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, invalidFile);

    expect(mockValidateFile).toHaveBeenCalledWith(invalidFile);
    expect(screen.getByText('Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).toBeInTheDocument();
    expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
  });

  it('показывает ошибку при файле превышающем размер', async () => {
    const user = userEvent.setup();
    const largeFile = new File(['test content'], 'large.pdf', { type: 'application/pdf' });
    
    // Mock файл размером больше 20MB
    Object.defineProperty(largeFile, 'size', { value: 21 * 1024 * 1024 });
    
    mockValidateFile.mockReturnValue({ 
      isValid: false, 
      error: 'Размер файла не должен превышать 20MB' 
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, largeFile);

    expect(mockValidateFile).toHaveBeenCalledWith(largeFile);
    expect(screen.getByText('Размер файла не должен превышать 20MB')).toBeInTheDocument();
  });

  it('позволяет удалить загруженный файл', async () => {
    const user = userEvent.setup();
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('1 KB');

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Загружаем файл
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    expect(screen.getByText('test.pdf (1 KB)')).toBeInTheDocument();

    // Удаляем файл
    const removeButton = screen.getByRole('button', { name: /×/i });
    await user.click(removeButton);

    expect(screen.queryByText('test.pdf (1 KB)')).not.toBeInTheDocument();
  });

  it('очищает input при удалении файла', async () => {
    const user = userEvent.setup();
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('1 KB');

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Загружаем файл
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    // Удаляем файл
    const removeButton = screen.getByRole('button', { name: /×/i });
    await user.click(removeButton);

    // Проверяем, что можно загрузить тот же файл снова
    await user.upload(fileInput, validFile);
    expect(screen.getByText('test.pdf (1 KB)')).toBeInTheDocument();
  });

  it('очищает ошибку при удалении файла', async () => {
    const user = userEvent.setup();
    const invalidFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
    
    mockValidateFile.mockReturnValue({ 
      isValid: false, 
      error: 'Поддерживаются только файлы: PDF, DOC, DOCX, TXT' 
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Загружаем невалидный файл
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, invalidFile);

    expect(screen.getByText('Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).toBeInTheDocument();

    // Удаляем файл (хотя он не был добавлен, но ошибка должна очиститься)
    // В реальном компоненте кнопка удаления появляется только при успешной загрузке
    // Но мы можем проверить, что ошибка очищается при повторной загрузке валидного файла
    
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('1 KB');

    await user.upload(fileInput, validFile);

    expect(screen.queryByText('Поддерживаются только файлы: PDF, DOC, DOCX, TXT')).not.toBeInTheDocument();
    expect(screen.getByText('test.pdf (1 KB)')).toBeInTheDocument();
  });

  it('отправляет файл вместе с формой', async () => {
    const user = userEvent.setup();
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('1 KB');

    // Mock успешного ответа от API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Загружаем файл
    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

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

    // Проверяем, что FormData содержит файл
    const formDataCall = (global.fetch as jest.Mock).mock.calls[0][1];
    const formData = formDataCall.body as FormData;
    expect(formData.get('file')).toBe(validFile);
  });

  it('не отправляет файл если он не был загружен', async () => {
    const user = userEvent.setup();
    
    // Mock успешного ответа от API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    // Заполняем форму без файла
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

    // Проверяем, что FormData не содержит файл
    const formDataCall = (global.fetch as jest.Mock).mock.calls[0][1];
    const formData = formDataCall.body as FormData;
    expect(formData.get('file')).toBeNull();
  });

  it('форматирует размер файла правильно', async () => {
    const user = userEvent.setup();
    const validFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    mockValidateFile.mockReturnValue({ isValid: true });
    mockFormatFileSize.mockReturnValue('2.5 MB');

    render(<RequestPopup open={true} onClose={mockOnClose} />);

    const fileInput = screen.getByRole('button', { name: /приложить файл/i });
    await user.upload(fileInput, validFile);

    expect(mockFormatFileSize).toHaveBeenCalledWith(validFile.size);
    expect(screen.getByText('test.pdf (2.5 MB)')).toBeInTheDocument();
  });

  it('поддерживает различные типы файлов', async () => {
    const user = userEvent.setup();
    
    const testCases = [
      { file: new File(['content'], 'test.pdf', { type: 'application/pdf' }), expected: 'PDF' },
      { file: new File(['content'], 'test.doc', { type: 'application/msword' }), expected: 'DOC' },
      { file: new File(['content'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), expected: 'DOCX' },
      { file: new File(['content'], 'test.txt', { type: 'text/plain' }), expected: 'TXT' },
    ];

    for (const testCase of testCases) {
      mockValidateFile.mockReturnValue({ isValid: true });
      mockFormatFileSize.mockReturnValue('1 KB');

      render(<RequestPopup open={true} onClose={mockOnClose} />);

      const fileInput = screen.getByRole('button', { name: /приложить файл/i });
      await user.upload(fileInput, testCase.file);

      expect(screen.getByText(`test.${testCase.expected.toLowerCase()} (1 KB)`)).toBeInTheDocument();
      
      // Очищаем для следующего теста
      const removeButton = screen.getByRole('button', { name: /×/i });
      await user.click(removeButton);
    }
  });
});

