'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DealStageDropdown from '../components/DealStageDropdown';

function SortableLead({ lead, onStageChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #e5e7eb',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    backgroundColor: '#f9fafb',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#000000' }}>{lead.company}</div>
      <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>👤 {lead.name}</div>
      <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>💼 {lead.job_title || 'No Title'}</div>
      <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>✉️ {lead.email || 'No Email'}</div>
      <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.5rem' }}>
        🌍 Country: {lead.country || '—'}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.25rem',
        }}
      >
        <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>📊 Deal Stage:</span>
        <DealStageDropdown
          leadId={lead.id}
          currentStage={lead.current_stage || 'Lead Only'}
          onStageChange={onStageChange}
        />
      </div>
    </div>
  );
}

export default function LeadTrackerPage({ leadsData }) {
  const [leads, setLeads] = useState(leadsData);

  // Filter state for Deal Stage
  const [dealStageFilter, setDealStageFilter] = useState('');

  // Setup DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Drag end handler: reorder leads
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = leads.findIndex((lead) => lead.id === active.id);
      const newIndex = leads.findIndex((lead) => lead.id === over?.id);
      setLeads((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  // Update deal stage for a lead
  function handleStageChange(leadId, newStage) {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, current_stage: newStage } : lead
      )
    );
  }

  // Filter leads by dealStageFilter if set
  const filteredLeads = dealStageFilter
    ? leads.filter((lead) => lead.current_stage === dealStageFilter)
    : leads;

  // Unique deal stage options from all leads + your full list (or static list)
  const dealStageOptions = [
    '', // for "All"
    'Lead Only',
    'Meeting Only',
    'Demo Complete (10%)',
    'Proposal Sent (25%)',
    'Discussing Commercials (50%)',
    'Contract/Negotiation (90%)',
    'ON HOLD',
    'WON Deal',
    'Lost Deal',
    'CLOSED',
    'Hot Lead (50%)',
    'MEETING_SCHEDULED',
    'No-show to Meeting',
    'Termination Discussion',
    'Many Discussions',
    'New Demo (other departments)',
  ];

  return (
    <main style={{ padding: '2rem' }}>
      {/* Header and Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontWeight: 'normal', fontSize: '1.25rem', color: '#4b5563' }}>Lead Tracker</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.85rem',
              borderRadius: '0.25rem',
              border: '1px solid #d1d5db',
              color: '#4b5563',
              minWidth: '180px',
            }}
            value={dealStageFilter}
            onChange={(e) => setDealStageFilter(e.target.value)}
          >
            <option value="">All Deal Stages</option>
            {dealStageOptions
              .filter((stage) => stage !== '')
              .map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
          </select>

          {/* Add other filters here next to dealStageFilter */}
        </div>
      </div>

      {/* Drag and Drop List */}
      {filteredLeads.length === 0 ? (
        <div>No leads to show.</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredLeads.map((lead) => lead.id)} strategy={verticalListSortingStrategy}>
            {filteredLeads.map((lead) => (
              <SortableLead key={lead.id} lead={lead} onStageChange={handleStageChange} />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </main>
  );
}