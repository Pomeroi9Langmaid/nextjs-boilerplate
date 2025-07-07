'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from '../components/DealStageDropdown';
import { fetchLeadsFromAPI } from '../../lib/fetchLeads';

interface Lead {
  id: string;
  company: string;
  name: string;
  job_title?: string;
  email?: string;
  current_stage?: string;
  country?: string;
}

export default function SettingsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    refreshLeads();
  }, []);

  const refreshLeads = async () => {
    try {
      const data = await fetchLeadsFromAPI();
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  };

  const handleStageChange = async (leadId: string, newStage: string) => {
    try {
      const res = await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, newStage }),
      });

      if (res.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, current_stage: newStage } : lead
          )
        );
      } else {
        console.error('Failed to update deal stage');
      }
    } catch (err) {
      console.error('Network error during update:', err);
    }
  };

  const handleRollback = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/rollback-lead-stages', { method: 'POST' });
      if (res.ok) {
        setMessage('Rollback completed successfully.');
        refreshLeads();
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
    <main style={{ padding: '2rem', fontSize: '0.85rem', color: '#333' }}>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Settings</h1>

      <button
        onClick={handleRollback}
        disabled={loading}
        style={{
          padding: '0.4rem 0.8rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
        }}
      >
        {loading ? 'Rolling back...' : 'Rollback Lead Stages'}
      </button>

      {message && <p style={{ marginBottom: '1.5rem' }}>{message}</p>}

      {leads.length === 0 ? (
        <div>Loading leads...</div>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            style={{
              border: '1px solid #e5e7eb',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              backgroundColor: '#f9fafb',
              fontSize: '0.85rem',
              color: '#444',
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#171717' }}>{lead.company}</div>
            <div>👤 {lead.name}</div>
            <div>💼 {lead.job_title || 'No Title'}</div>
            <div>✉️ {lead.email || 'No Email'}</div>
            <div>🌍 Country: {lead.country || '—'}</div>
            <div style={{ marginTop: '0.5rem' }}>
              <DealStageDropdown
                leadId={lead.id}
                currentStage={lead.current_stage || 'Lead Only'}
                onStageChange={handleStageChange}
              />
            </div>
          </div>
        ))
      )}
    </main>
  );
}