import { validateFile, formatFileSize, MAX_FILE_SIZE_MB, MAX_FILE_SIZE_BYTES } from '../fileValidation';

describe('fileValidation', () => {
  describe('validateFile', () => {
    it('принимает валидный PDF файл', () => {
      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('принимает валидный DOC файл', () => {
      const file = new File(['content'], 'test.doc', { type: 'application/msword' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('принимает валидный DOCX файл', () => {
      const file = new File(['content'], 'test.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('принимает валидный TXT файл', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('отклоняет файл с неподдерживаемым расширением', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Поддерживаются только файлы: PDF, DOC, DOCX, TXT');
    });

    it('отклоняет файл без расширения', () => {
      const file = new File(['content'], 'test', { type: 'application/octet-stream' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Поддерживаются только файлы: PDF, DOC, DOCX, TXT');
    });

    it('отклоняет файл превышающий максимальный размер', () => {
      // Создаем файл размером больше 20MB
      const largeContent = new Array(MAX_FILE_SIZE_BYTES + 1).fill('a').join('');
      const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
      
      const result = validateFile(file);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(`Размер файла не должен превышать ${MAX_FILE_SIZE_MB}MB`);
    });

    it('принимает файл равный максимальному размеру', () => {
      const content = new Array(MAX_FILE_SIZE_BYTES).fill('a').join('');
      const file = new File([content], 'maxsize.pdf', { type: 'application/pdf' });
      
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('принимает файл меньше максимального размера', () => {
      const content = new Array(1024).fill('a').join(''); // 1KB
      const file = new File([content], 'small.pdf', { type: 'application/pdf' });
      
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('работает с файлами в верхнем регистре', () => {
      const file = new File(['content'], 'TEST.PDF', { type: 'application/pdf' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('работает с файлами в смешанном регистре', () => {
      const file = new File(['content'], 'Test.DoCx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const result = validateFile(file);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('formatFileSize', () => {
    it('форматирует 0 байт', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    it('форматирует байты', () => {
      expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('форматирует килобайты', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    it('форматирует мегабайты', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe('2.5 MB');
    });

    it('форматирует гигабайты', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
      expect(formatFileSize(1024 * 1024 * 1024 * 1.5)).toBe('1.5 GB');
    });

    it('округляет до 2 знаков после запятой', () => {
      expect(formatFileSize(1024 * 1.234)).toBe('1.23 KB');
      expect(formatFileSize(1024 * 1.236)).toBe('1.24 KB');
    });
  });

  describe('константы', () => {
    it('MAX_FILE_SIZE_MB равен 20', () => {
      expect(MAX_FILE_SIZE_MB).toBe(20);
    });

    it('MAX_FILE_SIZE_BYTES равен 20MB в байтах', () => {
      expect(MAX_FILE_SIZE_BYTES).toBe(20 * 1024 * 1024);
    });
  });
});

