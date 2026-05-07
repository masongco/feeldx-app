// ─── Types ────────────────────────────────────────────────────────────────────

export type RoomType =
  | 'kitchen'
  | 'bathroom'
  | 'living-room'
  | 'bedroom'
  | 'laundry';

export type Category =
  | 'flooring'
  | 'wall-finish'
  | 'benchtop'
  | 'cabinetry'
  | 'sofa'
  | 'table'
  | 'bed'
  | 'lighting';

export type CostLevel = 'low' | 'medium' | 'high';

// Used for dark-room and clash detection in the AI summary
export type Tone = 'light' | 'dark' | 'neutral';

export interface Item {
  id: string;
  name: string;
  category: Category;
  cost: CostLevel;
  tone: Tone;
  description: string;
}

// ─── Room configuration ───────────────────────────────────────────────────────

export const ROOMS: { id: RoomType; label: string }[] = [
  { id: 'kitchen',     label: 'Kitchen'     },
  { id: 'bathroom',    label: 'Bathroom'    },
  { id: 'living-room', label: 'Living Room' },
  { id: 'bedroom',     label: 'Bedroom'     },
  { id: 'laundry',     label: 'Laundry'     },
];

// Which categories are relevant to each room — order determines display order
export const ROOM_CATEGORIES: Record<RoomType, Category[]> = {
  kitchen:     ['flooring', 'wall-finish', 'benchtop', 'cabinetry', 'lighting'],
  bathroom:    ['flooring', 'wall-finish', 'benchtop', 'lighting'],
  'living-room': ['flooring', 'wall-finish', 'sofa', 'table', 'lighting'],
  bedroom:     ['flooring', 'wall-finish', 'bed', 'lighting'],
  laundry:     ['flooring', 'wall-finish', 'cabinetry', 'lighting'],
};

export const CATEGORY_LABEL: Record<Category, string> = {
  flooring:     'Flooring',
  'wall-finish': 'Wall Finish',
  benchtop:     'Benchtop',
  cabinetry:    'Cabinetry',
  sofa:         'Sofa',
  table:        'Table',
  bed:          'Bed',
  lighting:     'Lighting',
};

// ─── Items ────────────────────────────────────────────────────────────────────

export const ITEMS: Item[] = [
  // Flooring
  { id: 'floor-timber',   name: 'Timber',          category: 'flooring', cost: 'medium', tone: 'neutral', description: 'Warm engineered timber boards' },
  { id: 'floor-marble',   name: 'Marble',           category: 'flooring', cost: 'high',   tone: 'light',   description: 'Polished white marble tiles' },
  { id: 'floor-concrete', name: 'Polished Concrete',category: 'flooring', cost: 'medium', tone: 'dark',    description: 'Industrial polished concrete' },
  { id: 'floor-ceramic',  name: 'Ceramic Tiles',    category: 'flooring', cost: 'low',    tone: 'light',   description: 'Classic white ceramic tiles' },
  { id: 'floor-vinyl',    name: 'Vinyl Plank',      category: 'flooring', cost: 'low',    tone: 'neutral', description: 'Durable waterproof vinyl planks' },

  // Wall Finish
  { id: 'wall-white',    name: 'White Paint',       category: 'wall-finish', cost: 'low',    tone: 'light',   description: 'Crisp matte white paint' },
  { id: 'wall-charcoal', name: 'Charcoal Paint',    category: 'wall-finish', cost: 'low',    tone: 'dark',    description: 'Bold charcoal statement walls' },
  { id: 'wall-limewash', name: 'Limewash',          category: 'wall-finish', cost: 'medium', tone: 'light',   description: 'Textured limewash plaster' },
  { id: 'wall-timber',   name: 'Timber Cladding',   category: 'wall-finish', cost: 'high',   tone: 'dark',    description: 'Horizontal timber wall panels' },
  { id: 'wall-paper',    name: 'Wallpaper',         category: 'wall-finish', cost: 'medium', tone: 'neutral', description: 'Feature patterned wallpaper' },

  // Benchtop
  { id: 'bench-marble',  name: 'Marble',            category: 'benchtop', cost: 'high',   tone: 'light',   description: 'Classic Carrara marble' },
  { id: 'bench-granite', name: 'Black Granite',     category: 'benchtop', cost: 'high',   tone: 'dark',    description: 'Polished black granite' },
  { id: 'bench-quartz',  name: 'Caesarstone',       category: 'benchtop', cost: 'medium', tone: 'neutral', description: 'Engineered quartz surface' },
  { id: 'bench-lam',     name: 'Laminate',          category: 'benchtop', cost: 'low',    tone: 'neutral', description: 'Durable laminate finish' },
  { id: 'bench-timber',  name: 'Timber',            category: 'benchtop', cost: 'medium', tone: 'neutral', description: 'Solid hardwood benchtop' },

  // Cabinetry
  { id: 'cab-white',   name: 'White Gloss',         category: 'cabinetry', cost: 'medium', tone: 'light',   description: 'High-gloss white cabinet doors' },
  { id: 'cab-oak',     name: 'Timber Veneer',       category: 'cabinetry', cost: 'high',   tone: 'neutral', description: 'Natural oak veneer doors' },
  { id: 'cab-black',   name: 'Matte Black',         category: 'cabinetry', cost: 'medium', tone: 'dark',    description: 'Soft matte black finish' },
  { id: 'cab-navy',    name: 'Navy Blue',           category: 'cabinetry', cost: 'medium', tone: 'dark',    description: 'Rich navy painted doors' },
  { id: 'cab-budget',  name: 'Flat Pack',           category: 'cabinetry', cost: 'low',    tone: 'light',   description: 'Budget-friendly flat pack' },

  // Sofa
  { id: 'sofa-linen',   name: 'Linen Sofa',        category: 'sofa', cost: 'medium', tone: 'light',   description: 'Natural linen fabric sofa' },
  { id: 'sofa-leather', name: 'Leather Sectional', category: 'sofa', cost: 'high',   tone: 'dark',    description: 'Full-grain leather sectional' },
  { id: 'sofa-velvet',  name: 'Velvet Sofa',       category: 'sofa', cost: 'high',   tone: 'dark',    description: 'Deep velvet 3-seater' },
  { id: 'sofa-modular', name: 'Modular Sofa',      category: 'sofa', cost: 'medium', tone: 'neutral', description: 'Flexible modular system' },

  // Table
  { id: 'table-timber', name: 'Timber Dining Table',  category: 'table', cost: 'medium', tone: 'neutral', description: 'Solid hardwood dining table' },
  { id: 'table-marble', name: 'Marble Coffee Table',  category: 'table', cost: 'high',   tone: 'light',   description: 'Marble-top coffee table' },
  { id: 'table-glass',  name: 'Glass Dining Table',   category: 'table', cost: 'medium', tone: 'light',   description: 'Tempered glass dining table' },
  { id: 'table-metal',  name: 'Metal Side Table',     category: 'table', cost: 'low',    tone: 'dark',    description: 'Industrial metal side table' },

  // Bed
  { id: 'bed-upholstered', name: 'Upholstered Bed',   category: 'bed', cost: 'high',   tone: 'light',   description: 'Fabric upholstered bed frame' },
  { id: 'bed-timber',      name: 'Timber Bed Frame',  category: 'bed', cost: 'medium', tone: 'neutral', description: 'Solid timber slat bed' },
  { id: 'bed-metal',       name: 'Metal Bed Frame',   category: 'bed', cost: 'low',    tone: 'dark',    description: 'Industrial metal frame' },
  { id: 'bed-platform',    name: 'Platform Bed',      category: 'bed', cost: 'medium', tone: 'neutral', description: 'Low-profile platform design' },

  // Lighting
  { id: 'light-pendant',  name: 'Pendant Light',      category: 'lighting', cost: 'medium', tone: 'neutral', description: 'Decorative hanging pendant' },
  { id: 'light-recessed', name: 'Recessed Downlights',category: 'lighting', cost: 'low',    tone: 'neutral', description: 'Clean recessed LED downlights' },
  { id: 'light-chandel',  name: 'Chandelier',         category: 'lighting', cost: 'high',   tone: 'light',   description: 'Statement chandelier fixture' },
  { id: 'light-track',    name: 'Track Lighting',     category: 'lighting', cost: 'medium', tone: 'neutral', description: 'Adjustable track lights' },
  { id: 'light-floor',    name: 'Floor Lamp',         category: 'lighting', cost: 'low',    tone: 'neutral', description: 'Portable floor standing lamp' },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

export function getItemsByCategory(category: Category): Item[] {
  return ITEMS.filter(item => item.category === category);
}
