'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DealStageDropdown from '../components/DealStageDropdown';
import EngagementDropdown from '../components/EngagementDropdown';

interface Lead {
  id: string;
  company: string;
  name: string;
  title: string;
  email: string;
  country: string;
  source?: string;
  current_stage: string;
  engagement: string;
}

interface Props {
  lead: Lead;
  onDealStageChange: (leadId: string, newStage: string) => void;
  onEngagementChange: (leadId: string, newEngagement: string) => void;
}

const SortableLeadCard: React.FC<Props> = ({
  lead,
  onDealStageChange,
  onEngagementChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-2xl p-4 mb-4 shadow-sm bg-white"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Lead Info */}
        <div>
          <div className="font-semibold text-lg">{lead.company}</div>
          <div className="text-sm text-gray-700">
            {lead.name} – {lead.title}
          </div>
          <div className="text-sm text-gray-500">{lead.email}</div>
          <div className="text-sm text-gray-500">{lead.country}</div>
        </div>

        {/* Right: Dropdowns */}
        <div className="flex flex-col gap-2 justify-center items-start">
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
          {lead.source && (
            <div className="text-xs text-gray-600 mt-1">
              Source: <span className="font-medium">{lead.source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortableLeadCard;