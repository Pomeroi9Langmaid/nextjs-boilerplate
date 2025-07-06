'use client';

import { useEffect, useState } from 'react';

const standardDealStages = [
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

interface DealStageDropdownProps {
  leadId: string;
  currentStage: string | null | undefined;
  onStageChange: (leadId: string, newStage: string) => void;
}

export default function DealStageDropdown({
  leadId,
  currentStage,
  onStageChange,
}: DealStageDropdownProps) {
  const [selected, setSelected] = useState(currentStage || '');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setSelected(currentStage || '');
  }, [currentStage]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelected(newStage);
    setUpdating(true);

    try {
      await onStageChange(leadId, newStage);
    } catch (err) {
      console.error('Error updating deal stage:', err);
    } finally {
      setUpdating(false);
    }
  };

  // Merge current value with standard list, avoiding duplicates
  const allStages = [...standardDealStages];
  if (currentStage && !standardDealStages.includes(currentStage)) {
    allStages.push(currentStage);
  }

  return (
    <select
      value={selected}
      onChange={handleChange}
      style={{
        backgroundColor: dealStageColours[selected] || '#f0f0f0',
        border: '1px solid #ccc',
        padding: '4px 8px',
        borderRadius: '6px',
        opacity: updating ? 0.6 : 1,
        pointerEvents: updating ? 'none' : 'auto',
      }}
    >
      <option value="">— Select Deal Stage —</option>
      {allStages.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
}