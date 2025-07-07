'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRollback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/rollback-lead-stages', {
        method: 'POST',
      });

      if (response.ok) {
        setMessage('Rollback successful!');
      } else {
        const errorData = await response.json();
        setMessage(`Rollback failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setMessage(`Rollback error: ${error.message || error.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Settings</h1>

      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        {loading ? 'Rolling back...' : 'Rollback Lead Stages to Previous Day'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('failed') || message.includes('error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </main>
  );
}