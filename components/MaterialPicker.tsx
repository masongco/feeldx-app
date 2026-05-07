import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, getItemsByCategory } from '@/lib/data';

interface Props {
  room: RoomType;
  selections: Partial<Record<Category, Item>>;
  onSelect: (category: Category, item: Item | null) => void;
}

export default function MaterialPicker({ room, selections, onSelect }: Props) {
  const categories = ROOM_CATEGORIES[room];

  return (
    <div>
      {categories.map((category) => {
        const items = getItemsByCategory(category);
        const selected = selections[category];

        return (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              {CATEGORY_LABEL[category]}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {items.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(category, isSelected ? null : item)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: isSelected ? '2px solid black' : '1px solid #ccc',
                      borderRadius: '6px',
                      background: isSelected ? '#111' : '#fff',
                      color: isSelected ? '#fff' : '#333',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
