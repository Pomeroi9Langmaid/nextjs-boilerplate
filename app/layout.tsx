// app/layout.tsx
import React from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Andrew Leads',
  description: 'Lead Tracker and Settings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
          <Link href="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#374151' }}>
            Lead Tracker
          </Link>
          <Link href="/settings" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#374151' }}>
            Settings
          </Link>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}