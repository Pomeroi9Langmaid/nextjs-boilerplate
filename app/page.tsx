'use client';

import { useEffect, useState } from 'react';
import { DealStageDropdown } from '@/components/DealStageDropdown';
import { EngagementDropdown } from '@/components/EngagementDropdown';
import fetchLeads from '@/lib/fetchLeads';

export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  company: string;
  contact_name: string;
  job_title: string;
  email: string;
  current_stage: string;
  engagement: string;
  country?: string;
}

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const loadLeads = async () => {
      const data = await fetchLeads();
      setLeads(data);
    };
    loadLeads();
  }, []);

  const handleStageChange = async (leadId: string, newStage: string) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === leadId ? { ...lead, current_stage: newStage } : lead
    );
    setLeads(updatedLeads);

    await fetch('/api/update-deal-stage', {
      method: 'POST',
      body: JSON.stringify({ leadId, newStage }),
    });
  };

  const handleEngagementChange = async (leadId: string, newLevel: string) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === leadId ? { ...lead, engagement: newLevel } : lead
    );
    setLeads(updatedLeads);

    await fetch('/api/update-engagement', {
      method: 'POST',
      body: JSON.stringify({ leadId, newLevel }),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Deal Stage:</label>
          <select className="w-full border rounded px-2 py-1 h-10" size={6}>
            <option>Lead Only</option>
            <option>Meeting Only</option>
            <option>Demo Complete (10%)</option>
            <option>Proposal Sent (25%)</option>
            <option>Discussing Commercials (50%)</option>
            <option>Contract/Negotiation (90%)</option>
            <option>ON HOLD</option>
            <option>WON Deal</option>
            <option>Lost Deal</option>
            <option>CLOSED</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Engagement:</label>
          <select className="w-full border rounded px-2 py-1 h-10" size={2}>
            <option>Hot</option>
            <option>Warm</option>
          </select>
        </div>
      </div>

      {/* Lead Cards Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold mb-6">Lead Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white shadow-md p-4 rounded-xl border border-gray-200"
            >
              <div className="font-semibold text-lg mb-1">{lead.company}</div>
              <div className="text-sm text-gray-700 mb-1">
                {lead.contact_name}
                {lead.job_title ? ` – ${lead.job_title}` : ''}
              </div>
              <div className="text-sm text-gray-500 mb-2">{lead.email}</div>

              <div className="mb-2">
                <DealStageDropdown
                  leadId={lead.id}
                  currentStage={lead.current_stage}
                  onStageChange={handleStageChange}
                />
              </div>

              <div>
                <EngagementDropdown
                  leadId={lead.id}
                  currentLevel={lead.engagement}
                  onEngagementChange={handleEngagementChange}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}