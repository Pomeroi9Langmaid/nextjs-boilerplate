'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRollback = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/rollback-lead-stages', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      setMessage('Rollback completed successfully.');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Rollback error: ${error.message}`);
      } else {
        setMessage(`Rollback error: ${String(error)}`);
      }
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
          padding: '0.5rem 1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '0.25rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          border: 'none',
        }}
      >
        {loading ? 'Rolling back...' : 'Rollback Lead Stages'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.startsWith('Rollback error') ? '#b91c1c' : '#15803d' }}>
          {message}
        </p>
      )}
    </main>
  );
}