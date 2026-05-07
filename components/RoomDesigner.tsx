'use client';

import { useState } from 'react';
import { RoomType, Category, Item } from '@/lib/data';
import RoomSelector from './RoomSelector';
import MaterialPicker from './MaterialPicker';
import SummaryPanel from './SummaryPanel';

export default function RoomDesigner() {
  const [room, setRoom] = useState<RoomType>('kitchen');
  const [selections, setSelections] = useState<Partial<Record<Category, Item>>>({});

  function handleRoomChange(newRoom: RoomType) {
    setRoom(newRoom);
    setSelections({});
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
          <SummaryPanel room={room} selections={selections} />
        </div>
      </div>
    </div>
  );
}
