useEffect(() => {
  async function fetchLeads() {
    try {
      const res = await fetch('/api/get-leads');
      console.log('Fetch status:', res.status);
      const data = await res.json();
      console.log('Fetched leads:', data);
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  }

  fetchLeads();
}, []);