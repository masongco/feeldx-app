import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, ROOMS } from '@/lib/data';
import { Summary } from '@/lib/summary';

const COST_BADGE: Record<string, string> = {
  low:    'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  high:   'bg-red-100 text-red-800',
};

const COST_LABEL: Record<string, string> = {
  low: 'Low budget', medium: 'Mid range', high: 'Premium',
};

interface Props {
  room: RoomType;
  selections: Partial<Record<Category, Item>>;
  summary: Summary | null;
  onGenerate: () => void;
}

export default function SummaryPanel({ room, selections, summary, onGenerate }: Props) {
  const categories = ROOM_CATEGORIES[room];
  const roomLabel = ROOMS.find((r) => r.id === room)?.label ?? room;
  const selectedCount = categories.filter((c) => selections[c]).length;
  const hasSelections = selectedCount > 0;

  return (
    <div className="space-y-4">

      {/* Current selections */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
          Your Selections
        </p>
        <p className="text-sm text-stone-500 mb-3">
          Room: <span className="font-semibold text-stone-800">{roomLabel}</span>
        </p>
        <div className="space-y-2">
          {categories.map((category) => {
            const item = selections[category];
            return (
              <div key={category} className="flex justify-between items-center text-sm">
                <span className="text-stone-400">{CATEGORY_LABEL[category]}</span>
                <span className={item ? 'font-medium text-stone-800' : 'text-stone-300'}>
                  {item ? item.name : '—'}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-400">
          {selectedCount} of {categories.length} selected
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={!hasSelections}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
          hasSelections
            ? 'bg-stone-900 text-white hover:bg-stone-700'
            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
        }`}
      >
        Generate AI Summary
      </button>

      {/* AI summary output */}
      {summary && (
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">AI Summary</p>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COST_BADGE[summary.costLevel]}`}>
              {COST_LABEL[summary.costLevel]}
            </span>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">{summary.overview}</p>

          {summary.costNotes.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1.5">Cost</p>
              <ul className="space-y-1">
                {summary.costNotes.map((note, i) => (
                  <li key={i} className="text-sm text-stone-600 flex gap-2">
                    <span className="text-stone-300 shrink-0">›</span>{note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.issues.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-1.5">Issues</p>
              <ul className="space-y-1.5">
                {summary.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.recommendations.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1.5">Recommendations</p>
              <ul className="space-y-1">
                {summary.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-stone-600 flex gap-2">
                    <span className="text-stone-300 shrink-0">→</span>{rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
