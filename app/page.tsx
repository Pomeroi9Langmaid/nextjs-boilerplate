'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState, useCallback } from 'react';
import DealStageDropdown from './components/DealStageDropdown';

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

  const fetchLeadsFromAPI = async (): Promise<Lead[]> => {
    console.log('🔍 Fetching leads from /api/get-leads...');
    const response = await fetch('/api/get-leads');
    const data = await response.json();
    console.log('✅ API response:', data);
    return data;
  };

  useEffect(() => {
    fetchLeadsFromAPI()
      .then(setLeads)
      .catch((err) => console.error('❌ Fetch error:', err));
  }, []);

  const handleStageChange = useCallback(
    async (leadId: string, newStage: string) => {
      try {
        console.log(`Updating lead ${leadId} to stage ${newStage}`);

        // Optimistically update local state
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, current_stage: newStage } : lead
          )
        );

        const res = await fetch('/api/update-deal-stage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: leadId, newStage }),
        });

        if (!res.ok) {
          console.error('❌ Failed to update deal stage on backend');
          // Optionally: rollback state here if you want
        } else {
          console.log(`✅ Updated ${leadId} to ${newStage} on backend`);
        }
      } catch (err) {
        console.error('❌ Network error during stage update:', err);
      }
    },
    []
  );

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
            <div style={{ fontWeight: 'bold' }}>{lead.company || '—'}</div>
            <div>👤 {lead.name || '—'}</div>
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