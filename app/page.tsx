// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import LeadCard from '../components/LeadCard';
import fetchLeads from '../lib/fetchLeads';
import updateDealStage from '../lib/updateDealStage';
import updateEngagement from '../lib/updateEngagement';

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

  useEffect(() => {
    const loadLeads = async () => {
      const data = await fetchLeads();
      setLeads(data);
    };
    loadLeads();
  }, []);

  const handleDealStageChange = async (leadId: string, newStage: string) => {
    await updateDealStage(leadId, newStage);
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  };

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    await updateEngagement(leadId, newEngagement);
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, engagement: newEngagement } : lead
      )
    );
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Smartvel Lead Tracker</h1>
      {leads.map((lead) => (
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