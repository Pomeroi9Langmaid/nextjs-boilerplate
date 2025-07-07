'use client';

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
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#374151',
      }}
    >
      <h1
        style={{
          fontWeight: 'normal',
          fontSize: '1.25rem',
          marginBottom: '1rem',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: '#111827',
        }}
      >
        Settings
      </h1>

      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          padding: '0.3rem 0.8rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem',
          fontWeight: 'normal',
        }}
      >
        Rollback Lead Stages
      </button>

      {message && <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>{message}</p>}
    </div>
  );
}