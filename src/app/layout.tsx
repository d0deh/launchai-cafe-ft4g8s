import type { Metadata } from 'next';
import './globals.css';
import content from '../content.json';

export const metadata: Metadata = {
  title: content.businessName,
  description: content.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
        {content.colors && (
          <style>{`
            :root {
              --color-primary: ${content.colors.primary};
              --color-secondary: ${content.colors.secondary};
              --color-accent: ${content.colors.accent};
            }
          `}</style>
        )}
      </head>
      <body className="font-cairo antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
