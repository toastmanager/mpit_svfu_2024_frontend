import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const bebasNeuePro = localFont({
  src: [
    {
      path: './fonts/BebasNeuePro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-Middle.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-MiddleItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-Book.ttf',
      weight: '350',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-BookItalic.ttf',
      weight: '350',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-bebas-neue-pro',
});

export const metadata: Metadata = {
  title: 'Якутия GO',
  description: 'Портал для туристов и местных жителей',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${bebasNeuePro.variable} antialiased dark`}>
        {children}
      </body>
    </html>
  );
}
