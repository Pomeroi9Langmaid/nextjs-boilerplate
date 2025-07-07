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
  'Hot Lead (50%)',
  'MEETING_SCHEDULED',
  'No-show to Meeting',
  'Termination Discussion',
  'Many Discussions',
  'New Demo (other departments)',
];

const getColor = (stage: string) => {
  switch (stage) {
    case 'Lead Only': return '#e5e7eb';
    case 'Meeting Only': return '#fcd34d';
    case 'Demo Complete (10%)': return '#93c5fd';
    case 'Proposal Sent (25%)': return '#60a5fa';
    case 'Discussing Commercials (50%)': return '#f97316';
    case 'Contract/Negotiation (90%)': return '#10b981';
    case 'WON Deal': return '#22c55e';
    case 'Lost Deal': return '#ef4444';
    case 'ON HOLD': return '#a78bfa';
    case 'CLOSED': return '#6b7280';
    case 'Hot Lead (50%)': return '#a855f7';
    case 'MEETING_SCHEDULED': return '#fbbf24';
    case 'No-show to Meeting': return '#9ca3af';
    case 'Termination Discussion': return '#f87171';
    case 'Many Discussions': return '#f59e0b';
    case 'New Demo (other departments)': return '#60a5fa';
    default: return '#d1d5db';
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
        padding: '0.15rem 0.4rem',
        border: '1px solid #d1d5db',
        fontWeight: 'normal',       // Removed bold
        fontSize: '0.85rem',        // Match other lead info font size
        minWidth: '140px',
        cursor: 'pointer',
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