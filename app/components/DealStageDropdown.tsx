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
    case 'Lead Only':
      return '#e5e7eb'; // light gray
    case 'Meeting Only':
      return '#fcd34d'; // yellow
    case 'Demo Complete (10%)':
      return '#93c5fd'; // blue
    case 'Proposal Sent (25%)':
      return '#60a5fa'; // darker blue
    case 'Discussing Commercials (50%)':
      return '#f97316'; // orange
    case 'Contract/Negotiation (90%)':
      return '#10b981'; // green
    case 'WON Deal':
      return '#22c55e'; // bright green
    case 'Lost Deal':
      return '#ef4444'; // red
    case 'ON HOLD':
      return '#a78bfa'; // purple
    case 'CLOSED':
      return '#6b7280'; // dark gray
    default:
      return '#d1d5db'; // fallback gray
  }
};

const DealStageDropdown: React.FC<Props> = ({ leadId, currentStage, onStageChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = event.target.value;
    onStageChange(leadId, newStage);
  };

  return (
    <select
      value={currentStage}
      onChange={handleChange}
      style={{
        backgroundColor: getColor(currentStage),
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
        border: '1px solid #d1d5db',
        fontWeight: 'bold',
      }}
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