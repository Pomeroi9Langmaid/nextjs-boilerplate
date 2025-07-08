export async function updateDealStage(leadId: string, newStage: string) {
  const response = await fetch('/api/update-deal-stage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadId, newStage }),
  });

  if (!response.ok) {
    throw new Error('Failed to update deal stage');
  }
}