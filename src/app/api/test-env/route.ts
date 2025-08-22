import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Тест переменных окружения',
    env: {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_FROM: process.env.SMTP_FROM,
      NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
      CC_EMAILS: process.env.CC_EMAILS,
    }
  });
}
