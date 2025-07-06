'use client';

import { useState } from 'react';

const STAGES = [
  { value: 'Lead Only', label: 'Lead Only', colour: '#e0e0e0' },
  { value: 'Meeting Only', label: 'Meeting Only', colour: '#e0f0ff' },
  { value: 'Demo Complete (10%)', label: 'Demo Complete (10%)', colour: '#dbeeff' },
  { value: 'Proposal Sent (25%)', label: 'Proposal Sent (25%)', colour: '#fff2cc' },
  { value: 'Discussing Commercials (50%)', label: 'Discussing Commercials (50%)', colour: '#fce4ec' },
  { value: 'Contract/Negotiation (90%)', label: 'Contract/Negotiation (90%)', colour: '#e0ffe0' },
  { value: 'ON HOLD', label: 'ON HOLD', colour: '#eeeeee' },
  { value: 'WON Deal', label: 'WON Deal', colour: '#ccffcc' },
  { value: 'Lost Deal', label: 'Lost Deal', colour: '#ffd6d6' },
  { value: 'CLOSED', label: 'CLOSED', colour: '#ffcccc' },
];

export default function DealStageDropdown({
  currentStage,
  onChange,
}: {
  currentStage: string;
  onChange: (newStage: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        {currentStage || 'Set Stage'}
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            zIndex: 999,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginTop: '4px',
            width: '220px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {STAGES.map((stage) => (
            <div
              key={stage.value}
              onClick={() => handleSelect(stage.value)}
              style={{
                padding: '8px 12px',
                backgroundColor: currentStage === stage.value ? '#f0f0f0' : stage.colour,
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {stage.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}