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