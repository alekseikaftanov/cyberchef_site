import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ClientScripts } from "@/components/atoms/ClientScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Monaco", "Consolas", "Liberation Mono", "Menlo", "monospace"],
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberchef.ru'),
  title: "CyberChef - Инновационные IT-решения для вашего бизнеса",
  description: "Создаем будущее с помощью инновационных технологий. Веб-разработка, мобильные приложения, AI решения и многое другое.",
  keywords: [
    // Основные ключевые слова
    "CyberChef", "IT решения", "веб-разработка", "мобильные приложения", "искусственный интеллект", "AI", "технологии", "инновации",
    
    // Услуги
    "разработка веб-сайтов", "создание мобильных приложений", "AI решения", "машинное обучение", "аналитика данных", "облачные технологии",
    
    // Технологии
    "React", "Vue", "Angular", "Node.js", "Python", "Java", "Swift", "Kotlin", "Flutter", "React Native", "AWS", "Azure", "Google Cloud",
    
    // Специализация
    "стартапы", "корпоративные решения", "e-commerce", "финтех", "медицинские технологии", "образовательные платформы", "IoT решения"
  ],
  authors: [{ name: "CyberChef" }],
  creator: "CyberChef",
  publisher: "CyberChef",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Замените на ваш код
    yandex: "your-yandex-verification-code", // Замените на ваш код
  },
  alternates: {
    canonical: 'https://cyberchef.ru/',
  },
  openGraph: {
    type: "website",
    url: "https://cyberchef.ru/",
    title: "CyberChef - Инновационные IT-решения для вашего бизнеса",
    description: "Создаем будущее с помощью инновационных технологий. Веб-разработка, мобильные приложения, AI решения и многое другое.",
    siteName: "CyberChef",
    locale: "ru_RU",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "CyberChef - Инновационные IT-решения для вашего бизнеса",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberChef - Инновационные IT-решения для вашего бизнеса",
    description: "Создаем будущее с помощью инновационных технологий. Веб-разработка, мобильные приложения, AI решения и многое другое.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6C1EFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* DNS prefetch for Google Fonts */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CyberChef",
              "url": "https://cyberchef.ru",
              "logo": "https://cyberchef.ru/android-chrome-512x512.png",
              "description": "Создаем будущее с помощью инновационных технологий. Веб-разработка, мобильные приложения, AI решения и многое другое.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Москва",
                "addressCountry": "RU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7 (495) 134-63-63",
                "contactType": "customer service",
                "email": "info@techvill.ru"
              },
              "sameAs": [
                "https://cyberchef.ru"
              ],
              "serviceType": [
                "Разработка веб-сайтов",
                "Создание мобильных приложений",
                "AI решения",
                "Машинное обучение",
                "Аналитика данных",
                "Облачные технологии",
                "React",
                "Vue",
                "Angular",
                "Node.js",
                "Python",
                "Java",
                "Swift",
                "Kotlin",
                "Flutter",
                "React Native",
                "AWS",
                "Azure",
                "Google Cloud",
                "Стартапы",
                "Корпоративные решения",
                "e-commerce",
                "Финтех",
                "Медицинские технологии",
                "Образовательные платформы",
                "IoT решения"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}
