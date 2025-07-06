// lib/fetchLeads.ts

export async function fetchLeadsFromAPI() {
  const res = await fetch('/api/get-leads');

  if (!res.ok) {
    throw new Error('Failed to fetch leads from API');
  }

  const data = await res.json();
  return data;
}