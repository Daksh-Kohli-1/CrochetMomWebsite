// ─── src/lib/catalog.js ──────────────────────────────────────────────────────
// Single source of truth for all product & flower data.
// Prices here are used by both ProductGrid and BouquetBuilder.

export const BOUQUET_FLOWERS = [
  {
    id: 'rose',
    name: 'Garden Rose',
    description: 'Classic long-stem roses',
    emoji: '🌹',
    price: 120,
    imageUrl: null,
  },
  {
    id: 'tulip',
    name: 'Dutch Tulip',
    description: 'Soft spring blooms',
    emoji: '🌷',
    price: 90,
    imageUrl: null,
  },
  {
    id: 'lily',
    name: 'Oriental Lily',
    description: 'Fragrant star-shaped petals',
    emoji: '🌸',
    price: 110,
    imageUrl: null,
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    description: 'Bold and cheerful',
    emoji: '🌻',
    price: 80,
    imageUrl: null,
  },
  {
    id: 'orchid',
    name: 'Phalaenopsis Orchid',
    description: 'Exotic and elegant',
    emoji: '🪷',
    price: 200,
    imageUrl: '/assets/5.jpeg',
  },
  {
    id: 'daisy',
    name: 'White Daisy',
    description: 'Delicate and timeless',
    emoji: '🌼',
    price: 60,
    imageUrl: null,
  },
];

export const PRODUCTS = [
  {
    id: 'azure-drift-wrap',
    name: 'The Azure Drift Wrap',
    price: 240,
    material: 'Fine merino wool blend',
    tagLabel: 'Frosty Blue',
    colorScheme: 'frosty-blue',
    imageUrl: '/assets/4.jpeg',
  },
  {
    id: 'petal-cardigan',
    name: 'Petal Cardigan',
    price: 380,
    material: 'Hand-dyed organic cotton',
    tagLabel: 'Blush Rose',
    colorScheme: 'pastel-pink',
    imageUrl: '/assets/5.jpeg',
  },
  {
    id: 'eclipse-throw',
    name: 'Eclipse Throw',
    price: 520,
    material: 'Weighted luxury alpaca yarn',
    tagLabel: 'Slate Charcoal',
    colorScheme: 'soft-lavender',
    imageUrl: '/assets/6.jpeg',
  },
];