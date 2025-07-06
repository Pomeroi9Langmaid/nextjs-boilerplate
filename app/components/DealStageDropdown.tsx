'use client';

import { useState } from 'react';

const DEAL_STAGES = [
  { label: 'Lead Only', colour: '#808080' },
  { label: 'Meeting Only', colour: '#007bff' },
  { label: 'Demo Complete (10%)', colour: '#6f42c1' },
  { label: 'Proposal Sent (25%)', colour: '#fd7e14' },
  { label: 'Discussing Commercials (50%)', colour: '#e36d00' },
  { label: 'Contract/Negotiation (90%)', colour: '#dc3545' },
  { label: 'ON HOLD', colour: '#ffc107' },
  { label: 'WON Deal', colour: '#28a745' },
  { label: 'Lost Deal', colour: '#6c757d' },
  { label: 'CLOSED', colour: '#d3d3d3' },
];

export default function DealStageDropdown({
  id,
  currentStage,
}: {
  id: string;
  currentStage: string;
}) {
  const [selected, setSelected] = useState(currentStage);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelected(newStage);

    await fetch('/api/update-deal-stage', {
      method: 'POST',
      body: JSON.stringify({ id, deal_stage: newStage }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <select value={selected} onChange={handleChange} style={{ padding: '6px', borderRadius: '6px' }}>
      {DEAL_STAGES.map(({ label, colour }) => (
        <option key={label} value={label} style={{ color: colour }}>
          {label}
        </option>
      ))}
    </select>
  );
}