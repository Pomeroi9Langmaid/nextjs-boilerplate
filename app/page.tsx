"use client";

import { useEffect, useState } from "react";
import { fetchLeads } from "@/lib/fetchLeads";
import DealStageDropdown from "@/components/DealStageDropdown";
import EngagementDropdown from "@/components/EngagementDropdown";

export const dynamic = "force-dynamic";

export default function Home() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const getLeads = async () => {
      const data = await fetchLeads();
      setLeads(data);
    };
    getLeads();
  }, []);

  const handleStageChange = async (leadId: string, newStage: string) => {
    await fetch("/api/update-deal-stage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, newStage }),
    });
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  };

  const handleEngagementChange = async (leadId: string, newEngagement: string) => {
    await fetch("/api/update-engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, newEngagement }),
    });
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, engagement_level: newEngagement } : lead
      )
    );
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Lead Tracker</h2>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 8,
            background: "#f9f9f9",
          }}
        >
          <div style={{ fontWeight: 600 }}>{lead.company}</div>
          <div style={{ color: "#333" }}>{lead.name} – {lead.email} • {lead.country}</div>

          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <DealStageDropdown
              leadId={lead.id}
              currentStage={lead.current_stage}
              onStageChange={handleStageChange}
            />

            <EngagementDropdown
              leadId={lead.id}
              engagementLevel={lead.engagement_level || ""}
              onEngagementChange={handleEngagementChange}
            />
          </div>
        </div>
      ))}
    </main>
  );
}