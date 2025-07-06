'use client';

import { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown';

export default function Page() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/get-leads'); // Make sure you have this API route
      const data = await res.json();
      setLeads(data || []);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Leads (Clean Layout)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '12px',
                background: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                🏢 {lead.company || '—'}
              </div>
              <div>👤 {lead.name || 'No Name'}</div>
              <div>💼 {lead.job_title || 'No Title'}</div>
              <div>✉️ {lead.email || 'No Email'}</div>

              <DealStageDropdown id={lead.id} currentStage={lead.deal_stage || ''} />

              <div>🌍 Country: {lead.country || '—'}</div>
              <div style={{ marginTop: '1rem' }}>
                <button style={{ marginRight: '0.5rem' }}>Edit</button>
                <button>View Log</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}