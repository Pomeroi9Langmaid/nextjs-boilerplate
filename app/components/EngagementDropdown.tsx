'use client';

import React from 'react';

interface Props {
  leadId: string;
  currentEngagement: string;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

const engagementOptions = [
  'Not Contacted',
  'Initial Contact',
  'Followed Up',
  'In Discussion',
  'High Interest',
  'No Response',
  'Unsubscribed',
];

const EngagementDropdown: React.FC<Props> = ({
  leadId,
  currentEngagement,
  onEngagementChange,
}) => {
  return (
    <select
      className="rounded-md px-2 py-1 text-sm bg-gray-100"
      value={currentEngagement}
      onChange={(e) => onEngagementChange(leadId, e.target.value)}
    >
      {engagementOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default EngagementDropdown;