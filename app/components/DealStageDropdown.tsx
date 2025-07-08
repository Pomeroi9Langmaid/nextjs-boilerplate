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
    case 'Demo Complete (10%)': return '#a5b4fc';
    case 'Proposal Sent (25%)': return '#fcd34d';
    case 'Discussing Commercials (50%)': return '#fdba74';
    case 'Contract/Negotiation (90%)': return '#f97316';
    case 'ON HOLD': return '#d1d5db';
    case 'WON Deal': return '#34d399';
    case 'Lost Deal': return '#f87171';
    case 'CLOSED': return '#9ca3af';
    default: return '#e5e7eb';
  }
};

const DealStageDropdown: React.FC<Props> = ({ leadId, currentStage, onStageChange }) => {
  return (
    <select
      className="rounded-md px-2 py-1 text-sm"
      style={{ backgroundColor: getColor(currentStage) }}
      value={currentStage}
      onChange={(e) => onStageChange(leadId, e.target.value)}
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