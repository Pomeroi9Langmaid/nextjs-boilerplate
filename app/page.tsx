'use client';

import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EngagementDropdown from '@/components/EngagementDropdown';
import DealStageDropdown from '@/components/DealStageDropdown';
import { fetchLeads } from '@/lib/fetchLeads';

export const dynamic = 'force-dynamic';

interface Lead {
  id: string;
  company: string;
  name: string;
  title: string;
  email: string;
  country: string;
  current_stage: string;
  source: string;
  engagement: string;
}

const FilterBar = ({ dealStages, engagementLevels, sources, selectedFilters, setSelectedFilters }: any) => {
  const toggleFilter = (type: string, value: string) => {
    setSelectedFilters((prev: any) => {
      const updated = { ...prev };
      updated[type] = updated[type].includes(value)
        ? updated[type].filter((v: string) => v !== value)
        : [...updated[type], value];
      return updated;
    });
  };

  const createDropdown = (label: string, options: string[], type: string) => (
    <div>
      <label className="text-sm font-semibold mr-2">{label}:</label>
      <select
        multiple
        className="border rounded p-1 text-sm"
        value={selectedFilters[type]}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, (option) => option.value);
          setSelectedFilters((prev: any) => ({ ...prev, [type]: selected }));
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex gap-4 justify-end p-2">
      {createDropdown('Deal Stage', dealStages, 'dealStage')}
      {createDropdown('Source', sources, 'source')}
      {createDropdown('Engagement', engagementLevels, 'engagement')}
    </div>
  );
};

const SortableLeadCard = ({ lead, onDealStageChange, onEngagementChange }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="border rounded p-4 mb-2 shadow-sm bg-white">
      <div className="font-semibold text-base">{lead.company}</div>
      <div className="text-sm text-gray-700">{lead.name} – {lead.title}</div>
      <div className="text-sm text-gray-500">{lead.email} • {lead.country}</div>
      <div className="flex gap-4 mt-2 items-center">
        <DealStageDropdown
          leadId={lead.id}
          currentStage={lead.current_stage}
          onStageChange={onDealStageChange}
        />
        <EngagementDropdown
          leadId={lead.id}
          currentEngagement={lead.engagement}
          onEngagementChange={onEngagementChange}
        />
        <span className="text-sm px-2 py-1 bg-gray-200 rounded">{lead.source}</span>
      </div>
    </div>
  );
};

export default function Page() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    dealStage: [] as string[],
    engagement: [] as string[],
    source: [] as string[],
  });

  useEffect(() => {
    const load = async () => {
      const data = await fetchLeads();
      setLeads(data);
      setFilteredLeads(data);
    };
    load();
  }, []);

  useEffect(() => {
    let temp = [...leads];
    ['dealStage', 'engagement', 'source'].forEach((type) => {
      const selected = selectedFilters[type as keyof typeof selectedFilters];
      if (selected.length > 0) {
        temp = temp.filter((lead) => selected.includes(lead[type === 'dealStage' ? 'current_stage' : type]));
      }
    });
    setFilteredLeads(temp);
  }, [selectedFilters, leads]);

  const handleDealStageChange = (leadId: string, newStage: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, current_stage: newStage } : lead))
    );
  };

  const handleEngagementChange = (leadId: string, newEngagement: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, engagement: newEngagement } : lead))
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setLeads((prev) => {
        const oldIndex = prev.findIndex((l) => l.id === active.id);
        const newIndex = prev.findIndex((l) => l.id === over.id);
        const reordered = arrayMove(prev, oldIndex, newIndex);
        return reordered;
      });
    }
  };

  const dealStages = Array.from(new Set(leads.map((l) => l.current_stage)));
  const engagementLevels = Array.from(new Set(leads.map((l) => l.engagement)));
  const sources = Array.from(new Set(leads.map((l) => l.source)));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <FilterBar
        dealStages={dealStages}
        engagementLevels={engagementLevels}
        sources={sources}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredLeads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {filteredLeads.map((lead) => (
            <SortableLeadCard
              key={lead.id}
              lead={lead}
              onDealStageChange={handleDealStageChange}
              onEngagementChange={handleEngagementChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}