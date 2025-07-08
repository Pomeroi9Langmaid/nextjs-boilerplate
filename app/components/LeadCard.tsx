'use client';

import React from 'react';
import DealStageDropdown from './DealStageDropdown';
import EngagementDropdown from './EngagementDropdown';

interface Props {
  lead: {
    id: string;
    company: string;
    name: string;
    title: string;
    email: string;
    country: string;
    source: string;
    current_stage: string;
    engagement: string;
  };
  onDealStageChange: (leadId: string, newStage: string) => void;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

const LeadCard: React.FC<Props> = ({ lead, onDealStageChange, onEngagementChange }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 mb-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left column: Info */}
        <div>
          <div className="font-semibold text-lg">{lead.company}</div>
          <div className="text-sm text-gray-700">{lead.name} – {lead.title}</div>
          <div className="text-sm text-gray-500">{lead.email}</div>
          <div className="text-sm text-gray-500">{lead.country}</div>
        </div>

        {/* Right column: Dropdowns */}
        <div className="flex flex-col gap-2 items-start justify-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Stage:</span>
            <DealStageDropdown
              leadId={lead.id}
              currentStage={lead.current_stage}
              onStageChange={onDealStageChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Engagement:</span>
            <EngagementDropdown
              leadId={lead.id}
              currentEngagement={lead.engagement}
              onEngagementChange={onEngagementChange}
            />
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Source: <span className="font-medium">{lead.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;