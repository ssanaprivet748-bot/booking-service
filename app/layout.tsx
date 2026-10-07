import type { Metadata } from 'next';
import { Oswald, Manrope } from 'next/font/google';
import './globals.css';

const display = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Booking Service — запись в барбершоп',
  description: 'Онлайн-запись в барбершоп за 30 секунд',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${display.variable} ${body.variable} antialiased`}>{children}</body>
    </html>
  );
}
