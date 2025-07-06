'use client';

import { useState, useEffect } from 'react';

type DealStageDropdownProps = {
  id: string;
  currentStage: string;
};

const stageOptions = [
  { label: 'Lead Only', value: 'Lead Only', colour: '#999' },
  { label: 'Meeting Only', value: 'Meeting Only', colour: '#999' },
  { label: 'Demo Complete (10%)', value: 'Demo Complete (10%)', colour: '#999' },
  { label: 'Proposal Sent (25%)', value: 'Proposal Sent (25%)', colour: '#6666cc' },
  { label: 'Discussing Commercials (50%)', value: 'Discussing Commercials (50%)', colour: '#3399cc' },
  { label: 'Contract/Negotiation (90%)', value: 'Contract/Negotiation (90%)', colour: '#33cc33' },
  { label: 'ON HOLD', value: 'ON HOLD', colour: '#ffcc00' },
  { label: 'WON Deal', value: 'WON Deal', colour: '#009933' },
  { label: 'Lost Deal', value: 'Lost Deal', colour: '#cc0000' },
  { label: 'CLOSED', value: 'CLOSED', colour: '#555' },
];

export default function DealStageDropdown({ id, currentStage }: DealStageDropdownProps) {
  const [selected, setSelected] = useState<string>(currentStage);

  useEffect(() => {
    setSelected(currentStage); // in case it arrives late
  }, [currentStage]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelected(newValue);

    await fetch('/api/update-deal-stage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, deal_stage: newValue }),
    });
  };

  const activeOption = stageOptions.find(opt => opt.value === selected);

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <strong style={{ marginRight: '0.5rem' }}>Deal Stage:</strong>
      <select
        value={selected}
        onChange={handleChange}
        style={{
          padding: '6px 10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: activeOption?.colour || '#fff',
          color: '#000',
        }}
      >
        {stageOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}