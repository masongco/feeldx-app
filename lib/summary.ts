import { RoomType, Category, Item, ROOM_CATEGORIES, CATEGORY_LABEL, ROOMS } from './data';

export type CostLevel = 'low' | 'medium' | 'high';

export interface Summary {
  overview: string;
  costLevel: CostLevel;
  costNotes: string[];
  issues: string[];
  recommendations: string[];
  missing: string[];
}

export function generateSummary(
  room: RoomType,
  selections: Partial<Record<Category, Item>>
): Summary {
  const categories = ROOM_CATEGORIES[room];
  const roomLabel = ROOMS.find((r) => r.id === room)?.label ?? room;
  const selected = categories.map((c) => selections[c]).filter((i): i is Item => i !== undefined);
  const missing = categories.filter((c) => !selections[c]).map((c) => CATEGORY_LABEL[c]);

  // ── Cost level ──────────────────────────────────────────────────────────────
  const highCount = selected.filter((i) => i.cost === 'high').length;
  const lowCount = selected.filter((i) => i.cost === 'low').length;
  const half = Math.ceil(selected.length / 2);

  let costLevel: CostLevel = 'medium';
  if (selected.length > 0) {
    if (highCount >= half) costLevel = 'high';
    else if (lowCount >= half && highCount === 0) costLevel = 'low';
  }

  // ── Cost notes ───────────────────────────────────────────────────────────────
  const costNotes: string[] = [];
  const highItems = selected.filter((i) => i.cost === 'high');
  const lowItems = selected.filter((i) => i.cost === 'low');

  if (highItems.length > 0)
    costNotes.push(`Premium selections: ${highItems.map((i) => i.name).join(', ')}.`);
  if (lowItems.length > 0)
    costNotes.push(`Budget-friendly selections: ${lowItems.map((i) => i.name).join(', ')}.`);
  if (selected.some((i) => i.name.toLowerCase().includes('marble')))
    costNotes.push('Marble requires professional installation and regular sealing — factor in ongoing maintenance costs.');

  // ── Compatibility issues ─────────────────────────────────────────────────────
  const issues: string[] = [];
  const flooring = selections['flooring'];
  const wallFinish = selections['wall-finish'];
  const cabinetry = selections['cabinetry'];
  const benchtop = selections['benchtop'];

  if (flooring?.tone === 'dark' && wallFinish?.tone === 'dark')
    issues.push('Both flooring and wall finish are dark — the room may feel smaller and dim. Consider lighter accents or adding more lighting.');

  if (flooring?.tone === 'light' && wallFinish?.tone === 'light') {
    const others = selected.filter((i) => i.category !== 'flooring' && i.category !== 'wall-finish');
    if (others.length > 0 && others.every((i) => i.tone === 'light'))
      issues.push('All finishes are light — the space may feel clinical. A darker accent piece would add warmth.');
  }

  if (cabinetry?.tone === 'dark' && benchtop?.tone === 'dark')
    issues.push('Dark cabinetry with a dark benchtop can feel heavy. A lighter benchtop would give better contrast.');

  // ── Recommendations ──────────────────────────────────────────────────────────
  const recommendations: string[] = [];

  if (missing.includes(CATEGORY_LABEL['lighting']))
    recommendations.push('Lighting is missing — it has the biggest impact on mood and atmosphere.');
  if (room === 'kitchen' && !selections['benchtop'])
    recommendations.push('The benchtop is the focal point of any kitchen — prioritise this selection.');
  if (room === 'bedroom' && !selections['bed'])
    recommendations.push('Choose a bed frame first to anchor the bedroom before selecting other pieces.');
  if (costLevel === 'high')
    recommendations.push('Budget is skewing high — consider swapping one premium item for a mid-range alternative.');

  const nonLightingMissing = missing.filter((m) => m !== CATEGORY_LABEL['lighting']);
  if (nonLightingMissing.length > 0)
    recommendations.push(`Still to select: ${nonLightingMissing.join(', ')}.`);

  // ── Overview ─────────────────────────────────────────────────────────────────
  const done = selected.length === categories.length;
  const overview = done
    ? `Your ${roomLabel.toLowerCase()} design is complete with a ${costLevel} budget profile.`
    : `Your ${roomLabel.toLowerCase()} has ${selected.length} of ${categories.length} items selected. ${missing.length > 0 ? `Missing: ${missing.join(', ')}.` : ''}`;

  return { overview, costLevel, costNotes, issues, recommendations, missing };
}
