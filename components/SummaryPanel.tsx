import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, ROOMS } from '@/lib/data';

interface Props {
  room: RoomType;
  selections: Partial<Record<Category, Item>>;
}

export default function SummaryPanel({ room, selections }: Props) {
  const categories = ROOM_CATEGORIES[room];
  const roomLabel = ROOMS.find((r) => r.id === room)?.label ?? room;
  const selectedCount = categories.filter((c) => selections[c]).length;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
      <p style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Your Selections</p>

      <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '0.75rem' }}>
        Room: <strong>{roomLabel}</strong>
      </p>

      {categories.map((category) => {
        const item = selections[category];
        return (
          <div key={category} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.4rem' }}>
            <span style={{ color: '#888' }}>{CATEGORY_LABEL[category]}</span>
            <span style={{ fontWeight: 500 }}>{item ? item.name : '—'}</span>
          </div>
        );
      })}

      <hr style={{ margin: '0.75rem 0' }} />
      <p style={{ fontSize: '0.8rem', color: '#888' }}>
        {selectedCount} of {categories.length} selected
      </p>
    </div>
  );
}
