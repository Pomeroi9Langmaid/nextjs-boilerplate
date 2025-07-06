'use client'

import { useState, useEffect } from 'react'

type DealStage =
  | 'Lead Only'
  | 'Meeting Only'
  | 'Demo Complete (10%)'
  | 'Proposal Sent (25%)'
  | 'Discussing Commercials (50%)'
  | 'Contract/Negotiation (90%)'
  | 'ON HOLD'
  | 'WON Deal'
  | 'Lost Deal'
  | 'CLOSED'

interface DealStageDropdownProps {
  initialValue: DealStage
  onChange: (value: DealStage) => void
}

const dealStageColours: Record<DealStage, string> = {
  'Lead Only': '#d3d3d3',
  'Meeting Only': '#cce5ff',
  'Demo Complete (10%)': '#b3f0ff',
  'Proposal Sent (25%)': '#ffd699',
  'Discussing Commercials (50%)': '#ffcccb',
  'Contract/Negotiation (90%)': '#ff9999',
  'ON HOLD': '#f5f5dc',
  'WON Deal': '#90ee90',
  'Lost Deal': '#f08080',
  'CLOSED': '#e0e0e0',
}

const DealStageDropdown: React.FC<DealStageDropdownProps> = ({ initialValue, onChange }) => {
  const [selectedStage, setSelectedStage] = useState<DealStage>(initialValue)

  useEffect(() => {
    setSelectedStage(initialValue)
  }, [initialValue])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as DealStage
    setSelectedStage(newStage)
    onChange(newStage)
  }

  return (
    <div style={{ marginBottom: '8px' }}>
      <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Deal Stage:</label>
      <select
        value={selectedStage}
        onChange={handleChange}
        style={{
          padding: '6px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: dealStageColours[selectedStage],
          fontWeight: 'bold',
        }}
      >
        {Object.keys(dealStageColours).map(stage => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DealStageDropdown