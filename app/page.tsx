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
  lead_source?: string; // New source field
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStage, setFilterStage] = useState<string>('');
  const [filterSource, setFilterSource] = useState<string>(''); // New source filter

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

  const handleFilterStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStage(event.target.value);
  };

  const handleFilterSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSource(event.target.value);
  };

  // Filter leads by both stage and source (if selected)
  const filteredLeads = leads.filter((lead) => {
    const stageMatches = filterStage ? lead.current_stage === filterStage : true;
    const sourceMatches = filterSource ? lead.lead_source === filterSource : true;
    return stageMatches && sourceMatches;
  });

  // Extract unique lead sources for filter dropdown options
  const uniqueSources = Array.from(new Set(leads.map((lead) => lead.lead_source).filter(Boolean)));

  return (
    <main style={{ padding: '2rem' }}>
      {/* Header + filters container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.25rem', color: '#000' }}>
          Lead Tracker
        </h2>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Deal Stage Filter */}
          <select
            value={filterStage}
            onChange={handleFilterStageChange}
            style={{
              fontSize: '0.85rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              minWidth: '180px',
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
          </select>

          {/* Source Filter */}
          <select
            value={filterSource}
            onChange={handleFilterSourceChange}
            style={{
              fontSize: '0.85rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              minWidth: '160px',
            }}
          >
            <option value="">-- Filter by Source --</option>
            {uniqueSources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

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
              fontFamily: 'Arial, Helvetica, sans-serif',
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
              🏷 Source: {lead.lead_source || '—'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.25rem' }}>
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
    </main>
  );
}