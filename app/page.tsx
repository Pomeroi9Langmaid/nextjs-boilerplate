export const dynamic = 'force-dynamic';

import { fetchLeads } from '../lib/fetchLeads';

export default async function Home() {
  const leads = await fetchLeads();

  console.log('LEADS:', leads); // ✅ now this will actually run server-side

  return (
    <main style={{ padding: '2rem' }}>
      <h1>My Leads</h1>
      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
<ul style={{ listStyle: 'none', padding: 0 }}>
  {leads.map((lead: any) => (
    <li key={lead.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div><strong>{lead.name}</strong> – {lead.email}</div>
      <div>🏢 <strong>Company:</strong> {lead.company}</div>
      <div>💼 <strong>Job Title:</strong> {lead.job_title}</div>
      <div>📊 <strong>Deal Stage:</strong> {lead.deal_stage}</div>
    </li>
  ))}
</ul>
      )}
    </main>
  );
}
