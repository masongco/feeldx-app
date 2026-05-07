'use client';

import { useState } from 'react';
import { RoomType, Category, Item } from '@/lib/data';
import { Summary, generateSummary } from '@/lib/summary';
import RoomSelector from './RoomSelector';
import MaterialPicker from './MaterialPicker';
import SummaryPanel from './SummaryPanel';

export default function RoomDesigner() {
  const [room, setRoom] = useState<RoomType>('kitchen');
  const [selections, setSelections] = useState<Partial<Record<Category, Item>>>({});
  const [summary, setSummary] = useState<Summary | null>(null);

  function handleRoomChange(newRoom: RoomType) {
    setRoom(newRoom);
    setSelections({});
    setSummary(null);
  }

  function handleSelect(category: Category, item: Item | null) {
    setSelections((prev) => {
      if (item === null) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: item };
    });
    setSummary(null);
  }

  function handleGenerate() {
    setSummary(generateSummary(room, selections));
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <RoomSelector selectedRoom={room} onSelect={handleRoomChange} />
      <hr style={{ margin: '1.5rem 0' }} />
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <MaterialPicker room={room} selections={selections} onSelect={handleSelect} />
        </div>
        <div style={{ flex: 1 }}>
          <SummaryPanel
            room={room}
            selections={selections}
            summary={summary}
            onGenerate={handleGenerate}
          />
        </div>
      </div>
    </div>
  );
}
