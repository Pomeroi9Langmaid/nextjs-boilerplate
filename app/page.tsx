'use client';

import { useEffect, useState } from 'react';
import DealStageDropdown from '@/components/DealStageDropdown';

interface Lead {
  id: number;
  company: string;
  contact_name: string;
  job_title: string;
  email: string;
  country: string;
  deal_stage: string;
}

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/get-leads');
      const data = await res.json();
      setLeads(data);
    };

    fetchLeads();
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>My Leads (Clean Layout)</h1>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '1rem',
            marginTop: '1.5rem',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>🏢 {lead.company}</h2>
          <div>👤 {lead.contact_name || 'No Contact'}</div>
          <div>💼 {lead.job_title || 'No Title'}</div>
          <div>✉️ {lead.email || 'No Email'}</div>

          <DealStageDropdown
            leadId={lead.id}
            currentStage={lead.deal_stage || ''}
          />

          <div>🌍 <strong>Country:</strong> {lead.country || '—'}</div>

          <div style={{ marginTop: '1rem' }}>
            <button style={{ marginRight: '0.5rem' }}>Edit</button>
            <button>View Log</button>
          </div>
        </div>
      ))}
    </main>
  );
}