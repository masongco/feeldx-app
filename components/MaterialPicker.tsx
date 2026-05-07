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
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {CATEGORY_LABEL[category]}
              </p>
              {selected && (
                <button
                  onClick={() => onSelect(category, null)}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {items.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(category, isSelected ? null : item)}
                    className={`relative text-left p-3 rounded-xl border transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] ${
                      isSelected
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-white/20">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                          <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <p className="text-sm font-medium leading-tight mb-1 pr-5">{item.name}</p>
                    <p className="text-xs mb-2 leading-tight text-stone-400">
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
