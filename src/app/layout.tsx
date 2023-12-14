import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exam Dumps',
  description: 'Free exam sources',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full min-h-screen bg-slate-100 py-12">
          <div className="mx-auto w-[1200px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
