'use client';

import { useState } from 'react';

type Props = {
  id: string;
  currentStage: string;
};

export default function DealStageDropdown({ id, currentStage }: Props) {
  const [stage, setStage] = useState(currentStage || '');

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setStage(newStage);
    await fetch('/api/update-deal-stage', {
      method: 'POST',
      body: JSON.stringify({ id, newStage }),
    });
  };

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <label htmlFor={`stage-${id}`}>📊 Deal Stage:</label>
      <select
        id={`stage-${id}`}
        value={stage}
        onChange={handleChange}
        style={{
          marginLeft: '0.5rem',
          padding: '0.3rem',
          borderRadius: '6px',
          border: '1px solid #ccc',
        }}
      >
        <option value="">—</option>
        <option value="Lead Only">Lead Only</option>
        <option value="Meeting Only">Meeting Only</option>
        <option value="Demo Complete (10%)">Demo Complete (10%)</option>
        <option value="Proposal Sent (25%)">Proposal Sent (25%)</option>
        <option value="Discussing Commercials (50%)">Discussing Commercials (50%)</option>
        <option value="Contract/Negotiation (90%)">Contract/Negotiation (90%)</option>
        <option value="ON HOLD">ON HOLD</option>
        <option value="WON Deal">WON Deal</option>
        <option value="Lost Deal">Lost Deal</option>
        <option value="CLOSED">CLOSED</option>
      </select>
    </div>
  );
}