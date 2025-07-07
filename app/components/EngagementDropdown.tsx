'use client';
import React from 'react';

interface Props {
  leadId: string;
  currentEngagement: string;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

// Define your engagement options (adjust as needed)
const engagementOptions = [
  'Low',
  'Medium',
  'High',
  'Very High',
];

// Colours for engagement options
const getColor = (engagement: string) => {
  switch (engagement) {
    case 'Low':
      return '#f87171'; // red-ish
    case 'Medium':
      return '#fbbf24'; // amber
    case 'High':
      return '#34d399'; // green
    case 'Very High':
      return '#3b82f6'; // blue
    default:
      return '#d1d5db'; // gray fallback
  }
};

const EngagementDropdown: React.FC<Props> = ({ leadId, currentEngagement, onEngagementChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onEngagementChange(leadId, e.target.value);
  };

  return (
    <select
      value={currentEngagement}
      onChange={handleChange}
      style={{
        backgroundColor: getColor(currentEngagement),
        borderRadius: '0.25rem',
        padding: '0.15rem 0.4rem',
        border: '1px solid #d1d5db',
        fontWeight: 'normal',
        fontSize: '0.85rem',
        minWidth: '120px',
        cursor: 'pointer',
      }}
    >
      {engagementOptions.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default EngagementDropdown;