'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import DealStageDropdown from './components/DealStageDropdown'; // ✅ Correct path

interface Lead {
  id: string;
  company_name: string;
  contact_name: string;
  job_title?: string;
  email?: string;
  current_stage: string;
  country?: string;
}

const fetchLeads = async (): Promise<Lead[]> => {
  console.log('🔍 Fetching leads from /api/get-leads...');
  const response = await fetch('/api/get-leads');
  const data = await response.json();
  console.log('✅ API response:', data);
  return data;
};

const updateDealStage = async (leadId: string, newStage: string) => {
  console.log(`📤 Updating lead ${leadId} to ${newStage}`);
  const response = await fetch('/api/update-deal-stage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadId, newStage }),
  });

  const result = await response.json();
  console.log(`✅ Updated ${leadId} to ${newStage}`, result);
};

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads().then(setLeads);
  }, []);

  const handleStageChange = async (leadId: string, newStage: string) => {
    await updateDealStage(leadId, newStage);
    const updatedLeads = await fetchLeads();
    setLeads(updatedLeads);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lead Tracker</h1>
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="bg-gray-100 rounded-xl shadow p-4 mb-6 transition-transform"
        >
          <h2 className="text-lg font-semibold">{lead.company_name}</h2>
          <p>👤 {lead.contact_name}</p>
          <p>💼 {lead.job_title || '—'}</p>
          <p>✉️ {lead.email || '—'}</p>
          <div className="mt-2 mb-1 flex items-center gap-2">
            <span>📊 Deal Stage:</span>
            <DealStageDropdown
              leadId={lead.id}
              currentStage={lead.current_stage}
              onStageChange={handleStageChange}
            />
          </div>
          <p>🌍 Country: {lead.country || '—'}</p>
        </div>
      ))}
    </main>
  );
}