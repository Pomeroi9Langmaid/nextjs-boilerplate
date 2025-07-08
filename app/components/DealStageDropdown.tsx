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
    case 'Meeting Only': return '#facc15';
    case 'Demo Complete (10%)': return '#bae6fd';
    case 'Proposal Sent (25%)': return '#a5b4fc';
    case 'Discussing Commercials (50%)': return '#fdba74';
    case 'Contract/Negotiation (90%)': return '#f87171';
    case 'ON HOLD': return '#d1d5db';
    case 'WON Deal': return '#86efac';
    case 'Lost Deal': return '#fca5a5';
    case 'CLOSED': return '#9ca3af';
    default: return '#e5e7eb';
  }
};

const DealStageDropdown: React.FC<Props> = ({ leadId, currentStage, onStageChange }) => {
  return (
    <select
      value={currentStage}
      onChange={(e) => onStageChange(leadId, e.target.value)}
      style={{ backgroundColor: getColor(currentStage), padding: '4px', borderRadius: '6px' }}
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