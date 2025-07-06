'use client';

import { useEffect, useState } from 'react';

const dealStageColours: Record<string, string> = {
  'Lead Only': '#e2e8f0',
  'Meeting Only': '#cbd5e1',
  'Demo Complete (10%)': '#fef08a',
  'Proposal Sent (25%)': '#fcd34d',
  'Discussing Commercials (50%)': '#fdba74',
  'Contract/Negotiation (90%)': '#fca5a5',
  'ON HOLD': '#d1d5db',
  'WON Deal': '#86efac',
  'Lost Deal': '#94a3b8',
  'CLOSED': '#e2e8f0',
};

const dealStages = [
  'Lead Only',
  'Meeting Only',
  'Demo Complete (10%)',
  'Proposal Sent (25%)',
  'Discussing Commercials (50%)',
  'Contract/Negotiation (90%)',
  'ON HOLD',
  'WON Deal',
  'Lost Deal',
  'CLOSED',
];

interface DealStageDropdownProps {
  leadId: string;
  currentStage: string;
}

export default function DealStageDropdown({ leadId, currentStage }: DealStageDropdownProps) {
  const [selected, setSelected] = useState(currentStage || 'Lead Only');

  useEffect(() => {
    setSelected(currentStage || 'Lead Only');
  }, [currentStage]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelected(newStage);

    try {
      const res = await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, newStage }),
      });

      if (!res.ok) {
        console.error('❌ Update failed');
      } else {
        console.log(`✅ Stage updated to "${newStage}" for lead ${leadId}`);
      }
    } catch (err) {
      console.error('❌ Network error during update', err);
    }
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      style={{
        backgroundColor: dealStageColours[selected] || '#f0f0f0',
        border: '1px solid #ccc',
        padding: '4px 8px',
        borderRadius: '6px',
      }}
    >
      {dealStages.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
}