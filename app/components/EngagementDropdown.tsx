'use client';
import React from 'react';

interface Props {
  leadId: string;
  currentEngagement: string;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

const engagementOptions = [
  'Low',
  'Medium',
  'High',
  'Unresponsive',
  'Not Contacted',
  'Replied',
  'Meeting Scheduled',
  'No-show',
];

const getColor = (engagement: string) => {
  switch (engagement) {
    case 'Low': return '#fca5a5';
    case 'Medium': return '#fdba74';
    case 'High': return '#86efac';
    case 'Unresponsive': return '#e5e7eb';
    case 'Not Contacted': return '#d1d5db';
    case 'Replied': return '#a5b4fc';
    case 'Meeting Scheduled': return '#facc15';
    case 'No-show': return '#f87171';
    default: return '#e5e7eb';
  }
};

const EngagementDropdown: React.FC<Props> = ({
  leadId,
  currentEngagement,
  onEngagementChange,
}) => {
  return (
    <select
      value={currentEngagement}
      onChange={(e) => onEngagementChange(leadId, e.target.value)}
      style={{ backgroundColor: getColor(currentEngagement), padding: '4px', borderRadius: '6px' }}
    >
      {engagementOptions.map((level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
};

export default EngagementDropdown;