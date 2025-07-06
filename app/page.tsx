'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown';
import { fetchLeadsFromAPI } from '../lib/fetchLeads';

interface Lead {
  id: string;
  company: string;
  contact_name: string;
  job_title?: string;
  email?: string;
  deal_stage?: string;
  country?: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await fetchLeadsFromAPI();
        console.log('Fetched leads:', data);
        setLeads(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    loadLeads();
  }, []);

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
            <div>👤 {lead.contact_name}</div>
            <div>💼 {lead.job_title || 'No Title'}</div>
            <div>✉️ {lead.email || 'No Email'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span>📊 Deal Stage:</span>
              <DealStageDropdown leadId={lead.id} currentStage={lead.current_stage || ''} />            </div>
            <div>🌍 Country: {lead.country || '—'}</div>
          </div>
        ))
      )}
    </main>
  );
}