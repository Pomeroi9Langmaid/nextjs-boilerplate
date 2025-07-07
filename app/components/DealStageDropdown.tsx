'use client';
import React from 'react';

interface Props {
  leadId: string;
  currentStage: string;
  onStageChange: (leadId: string, newStage: string) => void;
}

// Complete list of deal stages from your CSV
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
  'Hot Lead (50%)',
  'MEETING_SCHEDULED',
  'No-show to Meeting',
  'Termination Discussion',
  'Many Discussions',
  'New Demo (other departments)',
];

const getColor = (stage: string) => {
  switch (stage) {
    case 'Lead Only': return '#e5e7eb'; // light gray
    case 'Meeting Only': return '#fcd34d'; // yellow
    case 'Demo Complete (10%)': return '#93c5fd'; // blue
    case 'Proposal Sent (25%)': return '#60a5fa'; // darker blue
    case 'Discussing Commercials (50%)': return '#f97316'; // orange
    case 'Contract/Negotiation (90%)': return '#10b981'; // green
    case 'WON Deal': return '#22c55e'; // bright green
    case 'Lost Deal': return '#ef4444'; // red
    case 'ON HOLD': return '#a78bfa'; // purple
    case 'CLOSED': return '#6b7280'; // dark gray
    case 'Hot Lead (50%)': return '#a855f7'; // violet
    case 'MEETING_SCHEDULED': return '#fbbf24'; // amber
    case 'No-show to Meeting': return '#9ca3af'; // cool gray
    case 'Termination Discussion': return '#f87171'; // soft red
    case 'Many Discussions': return '#f59e0b'; // amber dark
    case 'New Demo (other departments)': return '#60a5fa'; // light blue
    default: return '#d1d5db'; // fallback gray
  }
};

const DealStageDropdown: React.FC<Props> = ({ leadId, currentStage, onStageChange }) => {
  console.log('Rendering DealStageDropdown for', leadId, 'with currentStage:', currentStage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = event.target.value;
    onStageChange(leadId, newStage);
  };

  return (
    <select
      value={dealStageOptions.includes(currentStage) ? currentStage : ''}
      onChange={handleChange}
      style={{
        backgroundColor: getColor(currentStage),
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
        border: '1px solid #d1d5db',
        fontWeight: 'bold',
      }}
    >
      {!dealStageOptions.includes(currentStage) && (
        <option value="" disabled>
          {currentStage} (Unknown Stage)
        </option>
      )}
      {dealStageOptions.map((stage) => (
        <option key={stage} value={stage}>
          {stage}
        </option>
      ))}
    </select>
  );
};

export default DealStageDropdown;
