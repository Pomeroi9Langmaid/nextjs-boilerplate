'use client';
import React, { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRollback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/rollback-lead-stages', {
        method: 'POST',
      });
      if (res.ok) {
        setMessage('Rollback successful.');
      } else {
        const data = await res.json();
        setMessage(`Rollback failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error: unknown) {
      // Safely handle unknown error type
      if (error instanceof Error) {
        setMessage(`Rollback error: ${error.message}`);
      } else {
        setMessage('Rollback error: Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontSize: '0.85rem', color: '#374151' /* dark gray */ }}>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#111827' /* dark charcoal */ }}>
        Settings
      </h1>

      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          padding: '0.4rem 1rem',
          fontSize: '0.85rem',
          backgroundColor: '#3b82f6', // blue
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading) (e.currentTarget.style.backgroundColor = '#2563eb'); // darker blue hover
        }}
        onMouseLeave={(e) => {
          if (!loading) (e.currentTarget.style.backgroundColor = '#3b82f6');
        }}
      >
        {loading ? 'Rolling Back...' : 'Rollback Lead Stages'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('successful') ? '#16a34a' : '#dc2626' }}>
          {message}
        </p>
      )}
    </main>
  );
}