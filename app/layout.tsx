import type { Metadata } from 'next'
import { Fredoka, Inter } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: '--font-display'
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Deane Decals | Custom Stickers & Team Decals',
  description:
    'Custom stickers, team decals, helmet stickers, and business logo decals in Warner Robins, GA. Proof before print, local pickup, and shipping available.',
  metadataBase: new URL('https://deanedecals.com'),
  openGraph: {
    title: 'Deane Decals | Custom Stickers & Team Decals',
    description:
      'Custom stickers, team decals, helmet stickers, and business logo decals. Proof before print, local pickup, and shipping available.',
    url: 'https://deanedecals.com',
    siteName: 'Deane Decals',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
