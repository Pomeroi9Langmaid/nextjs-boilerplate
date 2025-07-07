'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown';
import { fetchLeadsFromAPI } from '../lib/fetchLeads';

interface Lead {
  id: string;
  company: string;
  name: string;
  job_title?: string;
  email?: string;
  current_stage?: string;
  country?: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingRollback, setLoadingRollback] = useState<string | null>(null); // lead id loading rollback

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

  const handleRollback = async (leadId: string, currentStage: string | undefined) => {
    if (!currentStage) return;
    setLoadingRollback(leadId);

    try {
      const res = await fetch('/api/get-previous-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, currentStage }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const previousStage = data.previousStage;
        await handleStageChange(leadId, previousStage);
      } else {
        console.error('Rollback error:', data.error || 'Unknown error');
        alert('Rollback failed: ' + (data.error || 'No previous stage found'));
      }
    } catch (err) {
      console.error('Network error during rollback:', err);
      alert('Rollback network error');
    } finally {
      setLoadingRollback(null);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lead Tracker</h1>

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
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{lead.company}</div>
            <div>👤 {lead.name}</div>
            <div>💼 {lead.job_title || 'No Title'}</div>
            <div>✉️ {lead.email || 'No Email'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span>📊 Deal Stage:</span>
              <DealStageDropdown
                leadId={lead.id}
                currentStage={lead.current_stage || 'Lead Only'}
                onStageChange={handleStageChange}
              />
              <button
                disabled={loadingRollback === lead.id}
                onClick={() => handleRollback(lead.id, lead.current_stage)}
                style={{ marginLeft: '1rem', cursor: 'pointer', padding: '0.25rem 0.5rem' }}
              >
                {loadingRollback === lead.id ? 'Rolling back...' : 'Rollback'}
              </button>
            </div>
            <div>🌍 Country: {lead.country || '—'}</div>
          </div>
        ))
      )}
    </main>
  );
}