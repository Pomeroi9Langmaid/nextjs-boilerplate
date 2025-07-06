export async function fetchLeadsFromAPI() {
  try {
    console.log('Fetching leads from /api/get-leads...');
    const res = await fetch('/api/get-leads');

    if (!res.ok) {
      console.error('Response not OK:', res.status);
      throw new Error('Failed to fetch leads from API');
    }

    const data = await res.json();
    console.log('✅ API response:', data);
    return data;
  } catch (err) {
    console.error('❌ Error fetching leads:', err);
    throw err;
  }
}