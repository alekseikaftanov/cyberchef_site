import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Создаем транспортер для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.yandex.ru',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465', // true для 465, false для других портов
  auth: {
    user: process.env.SMTP_USER || 'techvillsite@automacon.ru',
    pass: process.env.SMTP_PASS || 'wybxgjtyizevnfjf',
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
    
    let name: string, position: string, email: string, phone: string, comment: string, resumeFile: File | null;
    
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      // Обработка JSON данных
      const body = await request.json();
      name = body.name;
      position = body.position;
      email = body.email;
      phone = body.phone;
      comment = body.comment;
      resumeFile = null;
    } else {
      // Обработка FormData
      const formData = await request.formData();
      name = formData.get('name') as string;
      position = formData.get('position') as string;
      email = formData.get('email') as string;
      phone = formData.get('phone') as string;
      comment = formData.get('comment') as string;
      resumeFile = formData.get('resumeFile') as File | null;
    }

    // Логируем данные для тестирования
    console.log('📧 Новое резюме получено:');
    console.log('Имя:', name);
    console.log('Позиция:', position);
    console.log('Email:', email);
    console.log('Телефон:', phone);
    console.log('Комментарий:', comment);
    console.log('Файл резюме:', resumeFile ? resumeFile.name : 'нет');
    console.log('---');

    // Валидация данных
    if (!name || !position || !email || !phone || !comment) {
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
            Новое резюме с сайта
          </h1>
          <h2 style="color: #6C1EFF; margin: 5px 0 0 0; font-size: 32px; font-weight: 700;">
            ТЕХВИЛЛ
          </h2>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📋 Данные кандидата:</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">👤 Имя:</td>
              <td style="padding: 8px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">💼 Позиция:</td>
              <td style="padding: 8px 0; color: #333;">${position}</td>
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
            ${resumeFile ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">📎 Файл резюме:</td>
              <td style="padding: 8px 0; color: #333;">${resumeFile.name}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #A5F04B; margin: 20px 0;">
          <h4 style="color: #333; margin-top: 0;">📝 Комментарий кандидата:</h4>
          <p style="color: #555; line-height: 1.6; margin: 0;">${comment}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">

          <p style="color: #888; font-size: 14px;">
            Резюме отправлено с сайта <a href="https://techvill.ru" style="color: #A5F04B;">ТЕХВИЛЛ</a>
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
    
    console.log('📧 Тема письма:', `Новое резюме от ${name} (${position})`);
    console.log('📧 HTML содержимое готово');
    
    // Подготавливаем вложения
    const attachments = [];
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer
      });
      console.log('📎 Файл резюме прикреплен:', resumeFile.name);
    }

    // Отправляем письмо
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      cc: ccEmails.length > 0 ? ccEmails : undefined, // Добавляем копии
      subject: `Новое резюме от ${name} (${position})`,
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
      message: 'Резюме успешно отправлено' 
    });

  } catch (error) {
    console.error('Ошибка отправки резюме:', error);
    return NextResponse.json(
      { error: 'Ошибка отправки резюме. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
