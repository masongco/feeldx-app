import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, getItemsByCategory } from '@/lib/data';

const COST_BADGE: Record<string, string> = {
  low:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  high:   'bg-red-50 text-red-700 border border-red-200',
};

const COST_BADGE_SELECTED = 'bg-white/20 text-white border border-white/30';

const COST_LABEL: Record<string, string> = {
  low: 'Budget', medium: 'Mid', high: 'Premium',
};

interface Props {
  room: RoomType;
  selections: Partial<Record<Category, Item>>;
  onSelect: (category: Category, item: Item | null) => void;
}

export default function MaterialPicker({ room, selections, onSelect }: Props) {
  const categories = ROOM_CATEGORIES[room];

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const items = getItemsByCategory(category);
        const selected = selections[category];

        return (
          <div key={category}>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              {CATEGORY_LABEL[category]}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {items.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(category, isSelected ? null : item)}
                    className={`text-left p-3 rounded-xl border transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] ${
                      isSelected
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:shadow-sm'
                    }`}
                  >
                    <p className="text-sm font-medium leading-tight mb-1">{item.name}</p>
                    <p className={`text-xs mb-2 leading-tight ${isSelected ? 'text-stone-400' : 'text-stone-400'}`}>
                      {item.description}
                    </p>
                    <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${isSelected ? COST_BADGE_SELECTED : COST_BADGE[item.cost]}`}>
                      {COST_LABEL[item.cost]}
                    </span>
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
