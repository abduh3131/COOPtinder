import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ServiceWorker from '../components/ServiceWorker';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CareerSwipe',
  description: 'Swipe through jobs and apply with AI-optimized resumes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#009A44" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
