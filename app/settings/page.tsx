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
      <nav style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #ddd', fontSize: '0.875rem', fontWeight: '500', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif'", color: '#555' }}>
        <Link href="/" style={{ marginRight: '1.25rem', textDecoration: 'none', color: '#555' }}>Lead Tracker</Link>
        <Link href="/settings" style={{ textDecoration: 'none', color: '#555' }}>Settings</Link>
      </nav>

      <main style={{ padding: '1.5rem 2rem', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif'", color: '#222' }}>
        <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Settings</h1>
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
            fontWeight: '600',
          }}
        >
          {loading ? 'Rolling back...' : 'Rollback Lead Stages'}
        </button>
        {message && <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#555' }}>{message}</p>}
      </main>
    </>
  );
}