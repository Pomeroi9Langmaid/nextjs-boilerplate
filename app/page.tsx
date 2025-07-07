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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStage(event.target.value);
  };

  // Filter leads by selected deal stage if any filter applied
  const filteredLeads = filterStage
    ? leads.filter((lead) => (lead.current_stage || 'Lead Only') === filterStage)
    : leads;

  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#374151', // Dark grey text for normal text
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <select
          value={filterStage}
          onChange={handleFilterChange}
          style={{
            fontSize: '0.85rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #d1d5db',
            color: '#374151',
            cursor: 'pointer',
            minWidth: '160px',
          }}
        >
          <option value="">-- Filter by Deal Stage --</option>
          <option value="Lead Only">Lead Only</option>
          <option value="Meeting Only">Meeting Only</option>
          <option value="Demo Complete (10%)">Demo Complete (10%)</option>
          <option value="Proposal Sent (25%)">Proposal Sent (25%)</option>
          <option value="Discussing Commercials (50%)">Discussing Commercials (50%)</option>
          <option value="Contract/Negotiation (90%)">Contract/Negotiation (90%)</option>
          <option value="ON HOLD">ON HOLD</option>
          <option value="WON Deal">WON Deal</option>
          <option value="Lost Deal">Lost Deal</option>
          <option value="CLOSED">CLOSED</option>
          <option value="Hot Lead (50%)">Hot Lead (50%)</option>
          <option value="MEETING_SCHEDULED">MEETING_SCHEDULED</option>
          <option value="No-show to Meeting">No-show to Meeting</option>
          <option value="Termination Discussion">Termination Discussion</option>
          <option value="Many Discussions">Many Discussions</option>
          <option value="New Demo (other departments)">New Demo (other departments)</option>
        </select>
      </div>

      {filteredLeads.length === 0 ? (
        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>No leads found.</div>
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
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#111827',
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
            >
              {lead.company}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              👤 {lead.name}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              💼 {lead.job_title || 'No Title'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              ✉️ {lead.email || 'No Email'}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#4b5563',
                marginTop: '0.5rem',
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
            >
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
              <span style={{ fontSize: '0.85rem', color: '#4b5563', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                📊 Deal Stage:
              </span>
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