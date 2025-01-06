import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/layout/Sidebar';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Page Generator',
  description: 'Generate pages with dynamic content',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <div className="ml-64">
          {children}
        </div>
      </body>
    </html>
  );
}