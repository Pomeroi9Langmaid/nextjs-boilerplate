'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRollback = async () => {
    if (!confirm('Are you sure you want to rollback the last deal stage change?')) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/rollback-deal-stage', {
        method: 'POST',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setMessage(`Rollback successful! Deal stage reverted to: ${data.rolledBackTo}`);
      } else {
        setMessage(`Rollback failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Rollback error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Settings</h1>
      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#dc2626',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          marginTop: '1rem',
        }}
      >
        {loading ? 'Rolling Back...' : 'Rollback Last Deal Stage Change'}
      </button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </main>
  );
}