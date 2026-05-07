import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, ROOMS } from '@/lib/data';
import { Summary } from '@/lib/summary';

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
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
      {/* Current selections */}
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

      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
        {selectedCount} of {categories.length} selected
      </p>

      <hr style={{ margin: '1rem 0' }} />

      {/* Generate button */}
      <button
        onClick={onGenerate}
        disabled={!hasSelections}
        style={{
          width: '100%',
          padding: '0.6rem',
          background: hasSelections ? '#111' : '#ddd',
          color: hasSelections ? '#fff' : '#999',
          border: 'none',
          borderRadius: '6px',
          cursor: hasSelections ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        Generate AI Summary
      </button>

      {/* AI Summary output */}
      {summary && (
        <div style={{ marginTop: '1rem' }}>
          <hr style={{ marginBottom: '1rem' }} />

          <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>{summary.overview}</p>

          <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            Budget: <span style={{ textTransform: 'capitalize' }}>{summary.costLevel}</span>
          </p>

          {summary.costNotes.length > 0 && (
            <ul style={{ fontSize: '0.8rem', color: '#555', paddingLeft: '1.2rem', marginBottom: '0.75rem' }}>
              {summary.costNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          )}

          {summary.issues.length > 0 && (
            <>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#b45309', marginBottom: '0.25rem' }}>Issues</p>
              <ul style={{ fontSize: '0.8rem', color: '#b45309', paddingLeft: '1.2rem', marginBottom: '0.75rem' }}>
                {summary.issues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </>
          )}

          {summary.recommendations.length > 0 && (
            <>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Recommendations</p>
              <ul style={{ fontSize: '0.8rem', color: '#555', paddingLeft: '1.2rem' }}>
                {summary.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
