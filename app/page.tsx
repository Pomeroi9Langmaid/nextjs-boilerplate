'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DealStageDropdown from './components/DealStageDropdown';
import { fetchLeadsFromAPI } from '../lib/fetchLeads';

interface Lead {
  id: string;
  company: string;
  name: string;
  job_title?: string;
  email?: string;
  current_stage?: string;
  country?: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    refreshLeads();
  }, []);

  const refreshLeads = async () => {
    try {
      const data = await fetchLeadsFromAPI();
      setLeads(data);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
  };

  const handleStageChange = async (leadId: string, newStage: string) => {
    try {
      const res = await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, newStage }),
      });

      if (res.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, current_stage: newStage } : lead
          )
        );
      } else {
        console.error('Failed to update deal stage');
      }
    } catch (err) {
      console.error('Network error during update:', err);
    }
  };

  return (
    <>
      <nav
        style={{
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #ddd',
          fontSize: '0.875rem',
          fontWeight: '500',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: '#555',
        }}
      >
        <Link href="/" style={{ marginRight: '1.25rem', textDecoration: 'none', color: '#555' }}>
          Lead Tracker
        </Link>
        <Link href="/settings" style={{ textDecoration: 'none', color: '#555' }}>
          Settings
        </Link>
      </nav>

      <main style={{ padding: '1.5rem 2rem' }}>
        <h1
          style={{
            fontSize: '1rem', // Reduced from 1.25rem
            marginBottom: '1rem',
            fontWeight: '600',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: '#222',
          }}
        >
          Lead Tracker
        </h1>

        {leads.length === 0 ? (
          <div style={{ color: '#666', fontSize: '0.9rem' }}>Loading leads...</div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              style={{
                border: '1px solid #e5e7eb',
                padding: '0.85rem 1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                backgroundColor: '#f9fafb',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#444', // Dark grey for all except company
                fontSize: '0.85rem', // Smaller font size for details
              }}
            >
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '1rem', // Company font size kept
                  marginBottom: '0.25rem',
                  color: '#222', // Stronger color for company name
                }}
              >
                {lead.company}
              </div>
              <div>👤 {lead.name}</div>
              <div>💼 {lead.job_title || 'No Title'}</div>
              <div>✉️ {lead.email || 'No Email'}</div>
              <div>🌍 Country: {lead.country || '—'}</div>

              <div style={{ marginTop: '0.4rem' }}>
                <DealStageDropdown
                  leadId={lead.id}
                  currentStage={lead.current_stage || 'Lead Only'}
                  onStageChange={handleStageChange}
                  // Added style prop for smaller dropdown (optional)
                />
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}