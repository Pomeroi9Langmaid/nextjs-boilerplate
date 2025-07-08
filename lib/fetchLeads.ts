export async function fetchLeads() {
  const response = await fetch('/api/get-leads', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }

  const data = await response.json();
  return data.leads;
}