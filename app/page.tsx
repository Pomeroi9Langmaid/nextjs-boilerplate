// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import DealStageDropdown from '@/components/DealStageDropdown';

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
    async function fetchLeads() {
      try {
        const res = await fetch('/api/get-leads');
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
    }

    fetchLeads();
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
              <DealStageDropdown id={lead.id} currentStage={lead.deal_stage || ''} />
            </div>
            <div>🌍 Country: {lead.country || '—'}</div>
          </div>
        ))
      )}
    </main>
  );
}