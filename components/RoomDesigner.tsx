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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <RoomSelector selectedRoom={room} onSelect={handleRoomChange} />

      <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:flex-[2]">
          <MaterialPicker room={room} selections={selections} onSelect={handleSelect} />
        </div>
        <div className="w-full lg:flex-1 lg:sticky lg:top-6">
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
