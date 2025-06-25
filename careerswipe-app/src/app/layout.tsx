import type { Metadata } from 'next';
import './globals.css';
import ServiceWorker from '../components/ServiceWorker';

export const metadata: Metadata = {
  title: 'CareerSwipe',
  description: 'Swipe through jobs and apply with AI-optimized resumes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="manifest" href="./manifest.json" />
        <meta name="theme-color" content="#009A44" />
      </head>
      <body className="antialiased bg-background text-text">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
