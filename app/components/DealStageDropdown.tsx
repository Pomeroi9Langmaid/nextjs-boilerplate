'use client';

import { useEffect, useState } from 'react';

const dealStageColours: Record<string, string> = {
  'Lead Only': '#e2e8f0',                // light grey
  'Meeting Only': '#cbd5e1',             // slightly darker grey
  'Demo Complete (10%)': '#fef08a',      // yellow
  'Proposal Sent (25%)': '#fcd34d',      // orange
  'Discussing Commercials (50%)': '#fdba74', // peach
  'Contract/Negotiation (90%)': '#fca5a5',   // red
  'ON HOLD': '#d1d5db',                  // neutral grey
  'WON Deal': '#86efac',                 // green
  'Lost Deal': '#94a3b8',                // cool grey
  'CLOSED': '#e2e8f0',                   // light grey
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

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
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