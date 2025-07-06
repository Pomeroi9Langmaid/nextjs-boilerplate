'use client';

import { useState } from 'react';

interface Props {
  leadId: string;
  currentStage: string;
  onStageChange: (leadId: string, newStage: string) => Promise<void>;
}

const STAGES = [
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

export default function DealStageDropdown({ leadId, currentStage, onStageChange }: Props) {
  const [selected, setSelected] = useState(currentStage);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelected(newStage);
    await onStageChange(leadId, newStage);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      style={{
        padding: '0.4rem',
        borderRadius: '0.4rem',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
      }}
    >
      {STAGES.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
}