export const dynamic = 'force-dynamic';

import { fetchLeads } from '../lib/fetchLeads';

export default async function Home() {
  const leads = await fetchLeads();

  console.log('LEADS:', leads); // ✅ now this will actually run server-side

  return (
    <main style={{ padding: '2rem' }}>
    <h1>My Leads (v2 updated layout)</h1>
      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
<ul style={{ listStyle: 'none', padding: 0 }}>
  {leads.map((lead: any) => (
    <li key={lead.id} style={{
  marginBottom: '1.5rem',
  padding: '1.25rem',
  border: '1px solid #ddd',
  borderRadius: '12px',
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
}}>
  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
    🏢 {lead.company || '—'}
  </div>
  <div style={{ marginBottom: '0.25rem' }}>
    👤 <strong>{lead.name || 'No Name'}</strong>
  </div>
  <div style={{ marginBottom: '0.25rem' }}>
    💼 {lead.job_title || 'No Title'}
  </div>
  <div style={{ marginBottom: '0.25rem' }}>
    ✉️ {lead.email || 'No Email'}
  </div>
  <div>
    📊 <strong>Deal Stage:</strong> {lead.deal_stage || '—'}
  </div>
</li>
  ))}
</ul>
      )}
    </main>
  );
}
