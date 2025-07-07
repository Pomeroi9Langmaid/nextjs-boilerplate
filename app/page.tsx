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

const dealStageOptions = [
  'Lead Only',
  'Meeting Only',
  'Demo Complete (10%)',
  'Proposal Sent (25%)',
  'Discussing Commercials (50%)',
  'Contract/Negotiation (90%)',
  'ON HOLD',
  'WON Deal',
  'Lost Deal',
  'CLOSED',
  'Hot Lead (50%)',
  'MEETING_SCHEDULED',
  'No-show to Meeting',
  'Termination Discussion',
  'Many Discussions',
  'New Demo (other departments)',
];

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStage, setFilterStage] = useState<string>('');

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

  const filteredLeads = filterStage
    ? leads.filter((lead) => lead.current_stage === filterStage)
    : leads;

  return (
    <main style={{ padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '1rem', right: '2rem' }}>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          style={{
            padding: '0.2rem 0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #d1d5db',
            fontSize: '0.75rem',
            fontWeight: 'normal',
            minWidth: '160px',
            cursor: 'pointer',
            backgroundColor: '#f9fafb',
          }}
        >
          <option value=''>-- Filter by Deal Stage --</option>
          {dealStageOptions.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <div style={{ marginTop: '3rem' }}>No leads found for selected stage.</div>
      ) : (
        filteredLeads.map((lead) => (
          <div
            key={lead.id}
            style={{
              border: '1px solid #e5e7eb',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              backgroundColor: '#f9fafb',
              marginTop: '3rem', // To prevent overlap with filter dropdown
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{lead.company}</div>
            <div>👤 {lead.name}</div>
            <div>💼 {lead.job_title || 'No Title'}</div>
            <div>✉️ {lead.email || 'No Email'}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              <span>📊 Deal Stage:</span>
              <DealStageDropdown
                leadId={lead.id}
                currentStage={lead.current_stage || 'Lead Only'}
                onStageChange={handleStageChange}
              />
            </div>
            <div>🌍 Country: {lead.country || '—'}</div>
          </div>
        ))
      )}
    </main>
  );
}