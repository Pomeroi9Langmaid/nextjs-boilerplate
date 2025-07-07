'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown';
import EngagementDropdown from './components/EngagementDropdown';
import { fetchLeadsFromAPI } from '../lib/fetchLeads';

interface Lead {
  id: string;
  company: string;
  name: string;
  job_title?: string;
  email?: string;
  current_stage?: string;
  country?: string;
  engagement?: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

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

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    try {
      const res = await fetch('/api/update-engagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, newEngagement }),
      });

      if (res.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, engagement: newEngagement } : lead
          )
        );
      } else {
        console.error('Failed to update engagement');
      }
    } catch (err) {
      console.error('Network error during update:', err);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
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

            {/* Engagement dropdown below company info */}
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#4b5563', marginRight: '0.5rem' }}>
                🔥 Engagement:
              </span>
              <EngagementDropdown
                leadId={lead.id}
                currentEngagement={lead.engagement || 'Low'}
                onEngagementChange={handleEngagementChange}
              />
            </div>

            {/* Deal Stage dropdown below engagement */}
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