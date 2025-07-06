import { useEffect, useState } from 'react';

const dealStageColours: Record<string, string> = {
  'Lead Only': '#e2e8f0', // grey-200
  'Meeting Only': '#cbd5e0', // grey-300
  'Demo Complete (10%)': '#fed7aa', // orange-200
  'Proposal Sent (25%)': '#fbd38d', // yellow-300
  'Discussing Commercials (50%)': '#faf089', // yellow-200
  'Contract/Negotiation (90%)': '#9ae6b4', // green-200
  'ON HOLD': '#fbb6ce', // pink-200
  'WON Deal': '#90cdf4', // blue-300
  'Lost Deal': '#feb2b2', // red-300
  'CLOSED': '#d6bcfa' // purple-200
};

export default function DealStageDropdown({ id, currentStage }: { id: string; currentStage: string }) {
  const [selectedStage, setSelectedStage] = useState(currentStage);

  useEffect(() => {
    setSelectedStage(currentStage);
  }, [currentStage]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelectedStage(newStage);

    try {
      await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, deal_stage: newStage })
      });
    } catch (err) {
      console.error('Failed to update deal stage', err);
    }
  };

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <strong>Deal Stage:</strong>{' '}
      <select
        value={selectedStage}
        onChange={handleChange}
        style={{
          backgroundColor: dealStageColours[selectedStage] || '#f0f0f0',
          padding: '0.25rem 0.5rem',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      >
        {Object.keys(dealStageColours).map(stage => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  );
}