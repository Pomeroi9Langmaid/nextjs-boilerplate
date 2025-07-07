import Link from 'next/link';
import React, { useState } from 'react';

export default function SettingsPage() {
  // your existing state and rollback code

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link href="/" style={{ marginRight: '1rem' }}>Lead Tracker</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        {/* rollback button UI */}
      </main>
    </>
  );
}