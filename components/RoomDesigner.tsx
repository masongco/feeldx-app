'use client';

import { useState } from 'react';
import { RoomType } from '@/lib/data';
import RoomSelector from './RoomSelector';

export default function RoomDesigner() {
  const [room, setRoom] = useState<RoomType>('kitchen');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <RoomSelector selectedRoom={room} onSelect={setRoom} />
    </div>
  );
}
