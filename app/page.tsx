'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown'; // Correct relative path

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
  const [refreshFlag, setRefreshFlag] = useState(false);

  const fetchLeadsFromAPI = async (): Promise<Lead[]> => {
    console.log('🔍 Fetching leads from /api/get-leads...');
    const response = await fetch('/api/get-leads');
    const data = await response.json();
    console.log('✅ API response:', data);
    return data;
  };

  const refreshLeads = async () => {
    try {
      const data = await fetchLeadsFromAPI();
      console.log('✅ Fetched leads:', data);
      setLeads(data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    }
  };

  useEffect(() => {
    refreshLeads();
  }, [refreshFlag]);

  const handleStageChange = async (leadId: string, newStage: string) => {
    try {
      console.log(`Updating lead ${leadId} to stage ${newStage}`);
      const res = await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, newStage }),
      });

      if (res.ok) {
        console.log(`✅ Updated ${leadId} to ${newStage}`);
        setRefreshFlag((prev) => !prev);
      } else {
        console.error('❌ Failed to update deal stage');
      }
    } catch (err) {
      console.error('❌ Network error during stage update:', err);
    }
  };

  console.log('Rendering leads with IDs:', leads.map((l) => l.id)); // Debug log for stable keys

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lead Tracker</h1>

      {leads.length === 0 ? (
        <div>Loading leads...</div>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id} // Ensure this is a unique, stable key
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