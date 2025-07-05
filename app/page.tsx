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
        <ul>
          {leads.map((lead: any) => (
            <li key={lead.id}>
              <strong>{lead.name}</strong> – {lead.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}