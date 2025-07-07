'use client';

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

  // Filter leads by selected stage if filter applied
  const filteredLeads = filterStage
    ? leads.filter((lead) => lead.current_stage === filterStage)
    : leads;

  return (
    <div style={{ position: 'relative', padding: '2rem' }}>
      {/* Filter dropdown top right */}
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.85rem',
            borderRadius: '0.25rem',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
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

      {/* Lead list */}
      {filteredLeads.length === 0 ? (
        <div>Loading leads...</div>
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
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#000000' }}>
              {lead.company}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>👤 {lead.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              💼 {lead.job_title || 'No Title'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              ✉️ {lead.email || 'No Email'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.5rem' }}>
              🌍 Country: {lead.country || '—'}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.25rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>📊 Deal Stage:</span>
              <DealStageDropdown
                leadId={lead.id}
                currentStage={lead.current_stage || 'Lead Only'}
                onStageChange={handleStageChange}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}