'use client';

import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

type DealStageDropdownProps = {
  id: string;
  currentStage: string;
};

const stageOptions = [
  { label: 'Lead Only', value: 'Lead Only', colour: '#999' },
  { label: 'Meeting Only', value: 'Meeting Only', colour: '#999' },
  { label: 'Demo Complete (10%)', value: 'Demo Complete (10%)', colour: '#999' },
  { label: 'Proposal Sent (25%)', value: 'Proposal Sent (25%)', colour: '#6666cc' },
  { label: 'Discussing Commercials (50%)', value: 'Discussing Commercials (50%)', colour: '#3399cc' },
  { label: 'Contract/Negotiation (90%)', value: 'Contract/Negotiation (90%)', colour: '#33cc33' },
  { label: 'ON HOLD', value: 'ON HOLD', colour: '#ffcc00' },
  { label: 'WON Deal', value: 'WON Deal', colour: '#009933' },
  { label: 'Lost Deal', value: 'Lost Deal', colour: '#cc0000' },
  { label: 'CLOSED', value: 'CLOSED', colour: '#555' },
];

export default function DealStageDropdown({ id, currentStage }: DealStageDropdownProps) {
  const [selected, setSelected] = useState(currentStage);

  useEffect(() => {
    setSelected(currentStage);
  }, [currentStage]);

  const handleChange = async (newValue: string) => {
    setSelected(newValue);

    await fetch('/api/update-deal-stage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, deal_stage: newValue }),
    });
  };

  const selectedColour = stageOptions.find(opt => opt.value === selected)?.colour || '#eee';

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <strong style={{ marginRight: '0.5rem' }}>Deal Stage:</strong>
      <Select.Root value={selected} onValueChange={handleChange}>
        <Select.Trigger
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: selectedColour,
            color: '#000',
            minWidth: 200,
          }}
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            style={{
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: 6,
              boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
              zIndex: 9999,
            }}
          >
            <Select.Viewport style={{ padding: 6 }}>
              {stageOptions.map(option => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 4,
                    backgroundColor: option.value === selected ? option.colour : 'transparent',
                    color: '#000',
                    cursor: 'pointer',
                  }}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}