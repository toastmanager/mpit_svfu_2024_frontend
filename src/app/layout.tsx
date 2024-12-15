import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/providers/auth-provider';
import Providers from '@/providers/providers';

// const bebasNeuePro = localFont({
//   src: [
//     {
//       path: './fonts/BebasNeuePro-Bold.ttf',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-BoldItalic.ttf',
//       weight: '700',
//       style: 'italic',
//     },
//     {
//       path: './fonts/BebasNeuePro-Middle.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-MiddleItalic.ttf',
//       weight: '500',
//       style: 'italic',
//     },
//     {
//       path: './fonts/BebasNeuePro-Italic.ttf',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: './fonts/BebasNeuePro-Regular.ttf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-Book.ttf',
//       weight: '350',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-BookItalic.ttf',
//       weight: '350',
//       style: 'italic',
//     },
//     {
//       path: './fonts/BebasNeuePro-Light.ttf',
//       weight: '300',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-LightItalic.ttf',
//       weight: '300',
//       style: 'italic',
//     },
//     {
//       path: './fonts/BebasNeuePro-Thin.ttf',
//       weight: '100',
//       style: 'normal',
//     },
//     {
//       path: './fonts/BebasNeuePro-ThinItalic.ttf',
//       weight: '100',
//       style: 'italic',
//     },
//   ],
//   variable: '--font-bebas-neue-pro',
// });

const bebasNeueProExpanded = localFont({
  src: [
    {
      path: './fonts/BebasNeuePro-ExpandedBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedMediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedBook.ttf',
      weight: '350',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedBookItalic.ttf',
      weight: '350',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedLightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/BebasNeuePro-ExpandedThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-bebas-neue-pro-expanded',
});

const bergamasco = localFont({
  src: [
    {
      path: './fonts/BergamascoBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/BergamascoBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/BergamascoRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BergamascoRegularItalic.ttf',
      weight: '400',
      style: 'italic',
    },

    {
      path: './fonts/BergamascoLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/BergamascoLightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-bergamasco',
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
      <body
        className={`${bebasNeueProExpanded.variable} ${bergamasco.variable} antialiased light font-medium`}
      >
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
