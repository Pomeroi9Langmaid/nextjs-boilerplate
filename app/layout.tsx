// app/layout.tsx (or your Header component)

import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ fontSize: '0.9rem', fontWeight: 'normal', padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <Link href="/" style={{ marginRight: '1.5rem', fontWeight: 'normal', color: 'black', textDecoration: 'none' }}>
            Lead Tracker
          </Link>
          <Link href="/settings" style={{ fontWeight: 'normal', color: 'black', textDecoration: 'none' }}>
            Settings
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}