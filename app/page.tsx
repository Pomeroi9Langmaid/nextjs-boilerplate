'use client';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown';
import { fetchLeadsFromAPI } from '../lib/fetchLeads';

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

interface Lead {
  id: string;
  company: string;
  name: string;
  job_title?: string;
  email?: string;
  current_stage?: string;
  country?: string;
}

export default function LeadTrackerPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStage, setFilterStage] = useState('');

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

  // Filter leads by selected stage
  const filteredLeads = filterStage
    ? leads.filter((lead) => lead.current_stage === filterStage)
    : leads;

  return (
    <>
      {/* Filter container below nav with spacing */}
      <div style={{ padding: '1rem 2rem 2rem 2rem', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '2rem',
            zIndex: 10,
          }}
        >
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.85rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              minWidth: '170px',
              fontFamily: 'inherit', // Use inherited font for consistency
              color: '#374151', // dark gray text color
              backgroundColor: 'white',
            }}
          >
            <option value="">-- Filter by Deal Stage --</option>
            {dealStageOptions.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>

        {/* Leads list - pushed down with padding top to avoid overlap */}
        <div style={{ paddingTop: '3rem' }}>
          {filteredLeads.length === 0 ? (
            <div style={{ fontFamily: 'inherit', fontSize: '1rem', color: '#6b7280' }}>
              Loading leads...
            </div>
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
                  fontFamily: 'inherit', // Restore default font style
                  color: '#374151', // Dark gray text color for all except company name
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#111827', // near black for company name
                    fontFamily: 'inherit',
                  }}
                >
                  {lead.company}
                </div>
                <div style={{ fontSize: '0.85rem' }}>👤 {lead.name}</div>
                <div style={{ fontSize: '0.85rem' }}>
                  💼 {lead.job_title || 'No Title'}
                </div>
                <div style={{ fontSize: '0.85rem' }}>
                  ✉️ {lead.email || 'No Email'}
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  🌍 Country: {lead.country || '—'}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <span>📊 Deal Stage:</span>
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
      </div>
    </>
  );
}