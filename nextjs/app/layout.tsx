import './globals.css';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import { GlobalContextProvider } from './Context/ImageContext';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Goals.com',
  description: 'Goals.com',
  applicationName: 'Goals.com',
  // keywords: ['telephony', 'freeswitch', 'asterisk', 'voip', 'vicidial', 'zimbra', 'dolibarr', 'callcenter'],
  metadataBase: new URL('https://maherdev.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-FR': '/fr-FR',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <GlobalContextProvider>
          {children}

        </GlobalContextProvider>
      </body>
    </html>
  )
}
