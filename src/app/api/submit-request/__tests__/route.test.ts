// Mock NextRequest
const mockNextRequest = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: mockNextRequest,
  NextResponse: {
    json: jest.fn((body, init) => ({
      json: () => Promise.resolve(body),
      status: init?.status || 200,
    })),
  },
}));

// Mock nodemailer
const mockSendMail = jest.fn();
const mockCreateTransporter = jest.fn(() => ({
  sendMail: mockSendMail,
}));

jest.mock('nodemailer', () => ({
  createTransporter: mockCreateTransporter,
}));

import { POST } from '../route';

describe.skip('/api/submit-request', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock environment variables
    process.env.SMTP_HOST = 'smtp.test.com';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_USER = 'test@test.com';
    process.env.SMTP_PASS = 'password';
    process.env.SMTP_FROM = 'test@test.com';
    process.env.NOTIFICATION_EMAIL = 'admin@test.com';
    process.env.CC_EMAILS = 'cc1@test.com,cc2@test.com';
  });

  afterEach(() => {
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_FROM;
    delete process.env.NOTIFICATION_EMAIL;
    delete process.env.CC_EMAILS;
  });

  it('успешно обрабатывает FormData запрос', async () => {
    mockSendMail.mockResolvedValueOnce({});

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');

    const mockRequest = {
      headers: {
        get: jest.fn().mockReturnValue('multipart/form-data'),
      },
      formData: jest.fn().mockResolvedValue(formData),
    };

    const response = await POST(mockRequest as any);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Заявка успешно отправлена');
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'admin@test.com',
      cc: ['cc1@test.com', 'cc2@test.com'],
      subject: 'Новая заявка от Иван Иванов (ООО Тест)',
      html: expect.stringContaining('Иван Иванов'),
      attachments: [],
    });
  });

  it('успешно обрабатывает JSON запрос', async () => {
    mockSendMail.mockResolvedValueOnce({});

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        fio: 'Иван Иванов',
        company: 'ООО Тест',
        email: 'test@example.com',
        phone: '+7 (123) 456 78 90',
        description: 'Тестовое описание задачи',
      }),
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalled();
  });

  it('обрабатывает FormData с файлом', async () => {
    mockSendMail.mockResolvedValueOnce({});

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');
    
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    formData.append('file', file);

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'admin@test.com',
      cc: ['cc1@test.com', 'cc2@test.com'],
      subject: 'Новая заявка от Иван Иванов (ООО Тест)',
      html: expect.stringContaining('test.pdf'),
      attachments: [
        {
          filename: 'test.pdf',
          content: expect.any(Buffer),
        },
      ],
    });
  });

  it('возвращает ошибку при отсутствии обязательных полей', async () => {
    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    // Отсутствуют другие обязательные поля

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Все поля обязательны для заполнения');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('возвращает ошибку при пустых полях', async () => {
    const formData = new FormData();
    formData.append('fio', '');
    formData.append('company', '');
    formData.append('email', '');
    formData.append('phone', '');
    formData.append('description', '');

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('Все поля обязательны для заполнения');
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it('обрабатывает ошибку отправки email', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP Error'));

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.error).toBe('Ошибка отправки заявки. Попробуйте позже.');
  });

  it('работает без CC_EMAILS', async () => {
    delete process.env.CC_EMAILS;
    mockSendMail.mockResolvedValueOnce({});

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'admin@test.com',
      cc: undefined,
      subject: 'Новая заявка от Иван Иванов (ООО Тест)',
      html: expect.any(String),
      attachments: [],
    });
  });

  it('использует значения по умолчанию для переменных окружения', async () => {
    // Очищаем все переменные окружения
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_PORT;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.SMTP_FROM;
    delete process.env.NOTIFICATION_EMAIL;
    delete process.env.CC_EMAILS;

    mockSendMail.mockResolvedValueOnce({});

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'techvillsite@automacon.ru',
      to: undefined,
      cc: undefined,
      subject: 'Новая заявка от Иван Иванов (ООО Тест)',
      html: expect.any(String),
      attachments: [],
    });
  });

  it('генерирует правильный HTML контент письма', async () => {
    mockSendMail.mockResolvedValueOnce({});

    const formData = new FormData();
    formData.append('fio', 'Иван Иванов');
    formData.append('company', 'ООО Тест');
    formData.append('email', 'test@example.com');
    formData.append('phone', '+7 (123) 456 78 90');
    formData.append('description', 'Тестовое описание задачи');

    const request = new NextRequest('http://localhost:3000/api/submit-request', {
      method: 'POST',
      body: formData,
    });

    await POST(request);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@test.com',
      to: 'admin@test.com',
      cc: ['cc1@test.com', 'cc2@test.com'],
      subject: 'Новая заявка от Иван Иванов (ООО Тест)',
      html: expect.stringMatching(/Иван Иванов/),
      attachments: [],
    });

    const callArgs = mockSendMail.mock.calls[0][0];
    expect(callArgs.html).toContain('Иван Иванов');
    expect(callArgs.html).toContain('ООО Тест');
    expect(callArgs.html).toContain('test@example.com');
    expect(callArgs.html).toContain('+7 (123) 456 78 90');
    expect(callArgs.html).toContain('Тестовое описание задачи');
    expect(callArgs.html).toContain('Кибершеф');
  });
});
