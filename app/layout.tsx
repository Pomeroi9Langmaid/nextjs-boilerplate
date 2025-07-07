// app/layout.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Lead Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <nav
          style={{
            padding: '1rem 2rem',
            borderBottom: '1px solid #ddd',
            marginBottom: '2rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            gap: '2rem',
            backgroundColor: '#f9fafb',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: '#111' }}>
            Lead Tracker
          </Link>
          <Link href="/settings" style={{ textDecoration: 'none', color: '#111' }}>
            Settings
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}