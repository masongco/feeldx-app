import { ROOMS, RoomType } from '@/lib/data';

interface Props {
  selectedRoom: RoomType;
  onSelect: (room: RoomType) => void;
}

export default function RoomSelector({ selectedRoom, onSelect }: Props) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
        Room
      </p>
      <div className="flex flex-wrap gap-2">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedRoom === room.id
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400 hover:text-stone-900'
            }`}
          >
            {room.label}
          </button>
        ))}
      </div>
    </div>
  );
}
