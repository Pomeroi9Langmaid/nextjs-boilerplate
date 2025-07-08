'use client';

import React, { useEffect, useState } from 'react';
import { fetchLeads } from '@/lib/fetchLeads';
import { updateDealStage } from '@/lib/updateDealStage';
import { updateEngagement } from '@/lib/updateEngagement';
import LeadCard from '@/components/LeadCard';

export const dynamic = 'force-dynamic';

const Page = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);

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
    setFilteredLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  };

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    await updateEngagement(leadId, newEngagement);
    setFilteredLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, engagement: newEngagement } : lead
      )
    );
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smartvel Lead Tracker</h1>
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
};

export default Page;