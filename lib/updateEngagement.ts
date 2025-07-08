export async function updateEngagement(leadId: string, newEngagement: string) {
    const response = await fetch('/api/update-engagement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leadId, newEngagement }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update engagement');
    }
  }