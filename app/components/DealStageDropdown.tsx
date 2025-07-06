'use client';

import { useState } from 'react';
import styles from './DealStageDropdown.module.css';

const stageOptions = [
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
];

type Props = {
  id: string;
  currentStage: string;
};

export default function DealStageDropdown({ id, currentStage }: Props) {
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value;
    setSelectedStage(newStage);
    setStatus('saving');

    try {
      const res = await fetch('/api/update-deal-stage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newStage }),
      });

      if (!res.ok) throw new Error('Failed to update');

      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000); // Reset after 2s
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Update failed:', err);
      setStatus('error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <select
        value={selectedStage}
        onChange={handleChange}
        style={{
          backgroundColor: selectedStage.includes('%') ? '#fff9c4' : selectedStage === 'WON Deal' ? '#c8e6c9' : selectedStage === 'Lost Deal' ? '#ffcdd2' : '#e0e0e0',
          fontWeight: 500,
          padding: '6px',
          borderRadius: '6px',
        }}
      >
        {stageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {status === 'saving' && <span style={{ color: '#888', fontSize: '0.8rem' }}>⏳ Saving...</span>}
      {status === 'success' && <span style={{ color: 'green', fontSize: '0.8rem' }}>✅ Updated!</span>}
      {status === 'error' && <span style={{ color: 'red', fontSize: '0.8rem' }}>❌ Failed to update</span>}
    </div>
  );
}