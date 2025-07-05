import { fetchLeads } from './actions/fetchLeads'

export default async function HomePage() {
  const leads = await fetchLeads()

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🧲 Leads Tracker</h1>

      {leads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <ul className="space-y-2">
          {leads.map((lead: any) => (
            <li key={lead.id} className="border p-4 rounded shadow">
              <strong>{lead.company_name}</strong>
              <div>Status: {lead.status}</div>
              <div>Last updated: {new Date(lead.updated_at).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
