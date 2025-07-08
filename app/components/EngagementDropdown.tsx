'use client';

import React from 'react';

interface Props {
  leadId: string;
  currentEngagement: string;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

const engagementOptions = ['Low', 'Medium', 'High', 'Very High'];

const getColor = (engagement: string) => {
  switch (engagement) {
    case 'Low': return '#f87171';        // red
    case 'Medium': return '#fbbf24';     // amber
    case 'High': return '#34d399';       // green
    case 'Very High': return '#3b82f6';  // blue
    default: return '#d1d5db';           // grey
  }
};

const EngagementDropdown: React.FC<Props> = ({ leadId, currentEngagement, onEngagementChange }) => {
  return (
    <select
      value={currentEngagement}
      onChange={(e) => onEngagementChange(leadId, e.target.value)}
      className="text-sm rounded-md px-2 py-1 border"
      style={{ backgroundColor: getColor(currentEngagement) }}
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