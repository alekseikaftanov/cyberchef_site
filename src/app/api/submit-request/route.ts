import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Создаем транспортер для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.yandex.ru',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465', // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER || 'techvillsite@automacon.ru',
    pass: process.env.SMTP_PASS || 'u48N1VAxf2AD@',
  },
});

export async function POST(request: NextRequest) {
  try {
    // Логируем переменные окружения для отладки
    console.log('🔧 Переменные окружения:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_FROM:', process.env.SMTP_FROM);
    console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);
    console.log('CC_EMAILS:', process.env.CC_EMAILS);
    console.log('---');
    
    let fio: string, company: string, email: string, phone: string, description: string, file: File | null;
    
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      // Обработка JSON данных
      const body = await request.json();
      fio = body.fio;
      company = body.company;
      email = body.email;
      phone = body.phone;
      description = body.description;
      file = null;
    } else {
      // Обработка FormData
      const formData = await request.formData();
      fio = formData.get('fio') as string;
      company = formData.get('company') as string;
      email = formData.get('email') as string;
      phone = formData.get('phone') as string;
      description = formData.get('description') as string;
      file = formData.get('file') as File | null;
    }

    // Логируем данные для тестирования
    console.log('📧 Новая заявка получена:');
    console.log('ФИО:', fio);
    console.log('Компания:', company);
    console.log('Email:', email);
    console.log('Телефон:', phone);
    console.log('Описание:', description);
    console.log('Файл:', file ? file.name : 'нет');
    console.log('---');

    // Валидация данных
    if (!fio || !company || !email || !phone || !description) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // HTML шаблон письма
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <!-- Заголовок -->
        <div style="text-align: center; margin-bottom: 30px; padding: 20px 0; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px;">
          <h1 style="color: #333; margin: 0; font-size: 28px; font-weight: 600;">
            Новая заявка с сайта
          </h1>
          <h2 style="color: #6C1EFF; margin: 5px 0 0 0; font-size: 32px; font-weight: 700;">
            ТЕХВИЛЛ
          </h2>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📋 Данные заявки:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">👤 ФИО:</td>
              <td style="padding: 8px 0; color: #333;">${fio}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">🏢 Компания:</td>
              <td style="padding: 8px 0; color: #333;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">📧 Email:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="mailto:${email}" style="color: #A5F04B;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">📞 Телефон:</td>
              <td style="padding: 8px 0; color: #333;">
                <a href="tel:${phone}" style="color: #A5F04B;">${phone}</a>
              </td>
            </tr>
            ${file ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">📎 Файл:</td>
              <td style="padding: 8px 0; color: #333;">${file.name}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #A5F04B; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">📝 Описание задачи:</h4>
          <p style="color: #555; line-height: 1.6; margin: 0;">${description}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">

          <p style="color: #888; font-size: 14px;">
            Заявка отправлена с сайта <a href="https://techvill.ru" style="color: #A5F04B;">ТЕХВИЛЛ</a>
          </p>
          <p style="color: #888; font-size: 12px;">
            Время отправки: ${new Date().toLocaleString('ru-RU')}
          </p>
        </div>
      </div>
    `;

    // Логируем информацию о письме
    console.log('📧 Письмо будет отправлено на:', process.env.NOTIFICATION_EMAIL || 'techvillsite@automacon.ru');
    
    // Обрабатываем дополнительные адреса для копий
    const ccEmails = process.env.CC_EMAILS ? process.env.CC_EMAILS.split(',').map(email => email.trim()) : [];
    if (ccEmails.length > 0) {
      console.log('📧 Копии будут отправлены на:', ccEmails.join(', '));
    }
    
    console.log('📧 Тема письма:', `Новая заявка от ${fio} (${company})`);
    console.log('📧 HTML содержимое готово');
    
    // Подготавливаем вложения
    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer
      });
      console.log('📎 Файл прикреплен:', file.name);
    }

    // Отправляем письмо
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      cc: ccEmails.length > 0 ? ccEmails : undefined, // Добавляем копии
      subject: `Новая заявка от ${fio} (${company})`,
      html: htmlContent,
      attachments
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Письмо успешно отправлено!');
    if (ccEmails.length > 0) {
      console.log('📧 Копии отправлены на:', ccEmails.join(', '));
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена' 
    });

  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки заявки. Попробуйте позже.' },
      { status: 500 }
    );
  }
} 