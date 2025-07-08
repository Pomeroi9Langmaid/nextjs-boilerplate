'use client';

import React from 'react';

interface Props {
  leadId: string;
  currentStage: string;
  onStageChange: (leadId: string, newStage: string) => void;
}

const dealStageOptions = [
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

const getColor = (stage: string) => {
  switch (stage) {
    case 'Lead Only': return '#e5e7eb';
    case 'Meeting Only': return '#c7d2fe';
    case 'Demo Complete (10%)': return '#fde68a';
    case 'Proposal Sent (25%)': return '#fdba74';
    case 'Discussing Commercials (50%)': return '#fca5a5';
    case 'Contract/Negotiation (90%)': return '#fcd34d';
    case 'ON HOLD': return '#d1d5db';
    case 'WON Deal': return '#6ee7b7';
    case 'Lost Deal': return '#f87171';
    case 'CLOSED': return '#9ca3af';
    default: return '#e5e7eb';
  }
};

const DealStageDropdown: React.FC<Props> = ({ leadId, currentStage, onStageChange }) => {
  return (
    <select
      value={currentStage}
      onChange={(e) => onStageChange(leadId, e.target.value)}
      className="text-sm rounded-md px-2 py-1 border"
      style={{ backgroundColor: getColor(currentStage) }}
    >
      {dealStageOptions.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
};

export default DealStageDropdown;