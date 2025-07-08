export async function fetchLeads() {
  const response = await fetch('/api/get-leads');
  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }
  const data = await response.json();
  return data;
}