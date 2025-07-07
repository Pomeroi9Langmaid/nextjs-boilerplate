'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRollback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/rollback-lead-stages', { method: 'POST' });
      if (res.ok) {
        setMessage('Rollback successful');
      } else {
        setMessage('Rollback failed');
      }
    } catch (error: any) {
      setMessage(`Rollback error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link href="/" style={{ marginRight: '1rem' }}>Lead Tracker</Link>
        <Link href="/settings" style={{ fontWeight: 'bold' }}>Settings</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Settings</h1>
        <button
          onClick={handleRollback}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Rolling back...' : 'Rollback Lead Stages'}
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </main>
    </>
  );
}