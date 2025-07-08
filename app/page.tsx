'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { fetchLeads } from '@/lib/fetchLeads';
import { updateDealStage } from '@/app/api/update-deal-stage/route';
import { updateEngagement } from '@/app/api/update-engagement/route';
import LeadCard from '@/components/LeadCard';

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

export default function Home() {
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
    setLeads(prev =>
      prev.map(lead =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  };

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    await updateEngagement(leadId, newEngagement);
    setLeads(prev =>
      prev.map(lead =>
        lead.id === leadId ? { ...lead, engagement: newEngagement } : lead
      )
    );
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Leads Tracker</h1>
      {leads.map(lead => (
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