'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const linkStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'normal',
    fontSize: '0.9rem',
    color: '#111827',
    marginRight: '1.5rem',
    textDecoration: 'none',
  };

  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: '#ffffff',
      }}
    >
      <Link href="/" style={pathname === '/' ? activeLinkStyle : linkStyle}>
        Lead Tracker
      </Link>
      <Link href="/settings" style={pathname === '/settings' ? activeLinkStyle : linkStyle}>
        Settings
      </Link>
    </nav>
  );
}