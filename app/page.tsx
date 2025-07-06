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
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              🏢 {lead.company || '—'}
            </div>
            <div>👤 {lead.name || 'No Name'}</div>
            <div>💼 {lead.job_title || 'No Title'}</div>
            <div>✉️ {lead.email || 'No Email'}</div>
            <div>📊 Deal Stage: {lead.deal_stage || '—'}</div>
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