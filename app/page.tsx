{leads.length === 0 ? (
  <div>Loading leads...</div>
) : (
  leads.map((lead) => {
    return (
      <div
        key={lead.id} // ✅ ensures React keeps track of individual lead blocks
        style={{
          border: '1px solid #e5e7eb',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          backgroundColor: '#f9fafb',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>{lead.company}</div>
        <div>👤 {lead.name}</div>
        <div>💼 {lead.job_title || 'No Title'}</div>
        <div>✉️ {lead.email || 'No Email'}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span>📊 Deal Stage:</span>
          <DealStageDropdown
            key={`${lead.id}-dropdown`} // ✅ stabilises the dropdown
            leadId={lead.id}
            currentStage={lead.current_stage || ''}
            onStageChange={handleStageChange}
          />
        </div>
        <div>🌍 Country: {lead.country || '—'}</div>
      </div>
    );
  })
)}