export async function updateEngagement(leadId: string, newEngagement: string) {
    const response = await fetch('/api/update-engagement', {
      method: 'POST',
      body: JSON.stringify({ leadId, newEngagement }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to update engagement');
    }
  }