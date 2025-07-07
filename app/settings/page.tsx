'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRollback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/rollback-lead-stages', { method: 'POST' });
      if (res.ok) {
        setMessage('Rollback completed successfully.');
      } else {
        setMessage('Rollback failed.');
      }
    } catch (error) {
      setMessage(`Rollback error: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif', color: '#222' }}>
      <h1 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Settings</h1>
      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          padding: '0.3rem 0.8rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          fontSize: '0.85rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '500',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        Rollback Lead Stages
      </button>
      {message && (
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#444' }}>
          {message}
        </p>
      )}
    </div>
  );
}