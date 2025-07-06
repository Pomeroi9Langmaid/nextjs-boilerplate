export const dynamic = 'force-dynamic';

import { fetchLeads } from '../lib/fetchLeads';

export default async function Page() {
  const leads = await fetchLeads();

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>My Leads (Clean Layout)</h1>
      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {leads.map((lead: any) => (
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
              <form action="/api/update-deal-stage" style={{ marginTop: '0.5rem' }}>
  <label htmlFor={`stage-${lead.id}`}>📊 Deal Stage:</label>
  <select
    name="deal_stage"
    defaultValue={lead.deal_stage || ''}
    onChange={async (e) => {
      const newStage = e.target.value;
      await fetch('/api/update-deal-stage', {
        method: 'POST',
        body: JSON.stringify({ id: lead.id, newStage }),
      });
    }}
    style={{
      marginLeft: '0.5rem',
      padding: '0.3rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
    }}
  >
    <option value="">—</option>
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
</form>              <div>🌍 Country: {lead.country || '—'}</div>
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