'use client';

import { useEffect, useState } from 'react';
import LeadCard from '../components/LeadCard';
import { fetchLeads } from '../lib/fetchLeads';
import { updateDealStage } from '../lib/updateDealStage';
import { updateEngagement } from '../lib/updateEngagement';

export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  company: string;
  name: string;
  title: string;
  email: string;
  country: string;
  source: string;
  current_stage: string;
  engagement: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLeads();
      setLeads(data);
      setFilteredLeads(data);
    };
    load();
  }, []);

  const handleDealStageChange = async (leadId: string, newStage: string) => {
    await updateDealStage(leadId, newStage);
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  };

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    await updateEngagement(leadId, newEngagement);
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, engagement: newEngagement } : lead
      )
    );
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Lead Tracker</h1>
      {filteredLeads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onDealStageChange={handleDealStageChange}
          onEngagementChange={handleEngagementChange}
        />
      ))}
    </main>
  );
}