import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('🔧 Тестируем nodemailer...');
    
    // Создаем транспортер
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 587,
      secure: false,
      auth: {
        user: 'techvillsite@automacon.ru',
        pass: 'wybxgjtyizevnfjf',
      },
    });
    
    console.log('📧 Транспортер создан');
    
    // Проверяем соединение
    await transporter.verify();
    console.log('✅ Соединение с SMTP сервером установлено');
    
    // Отправляем тестовое письмо
    const mailOptions = {
      from: 'techvillsite@automacon.ru',
      to: 'techvillsite@automacon.ru',
      subject: 'Тестовое письмо',
      text: 'Это тестовое письмо для проверки работы SMTP',
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Письмо отправлено:', info.messageId);
    
    return NextResponse.json({
      success: true,
      message: 'Тестовое письмо отправлено успешно',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('❌ Ошибка в тесте:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
