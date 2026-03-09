// ─── Central Product Catalog ─────────────────────────────────────────────────
// Single source of truth for all product names, prices, and metadata.
// Import from here anywhere you need product info.

export const PRODUCTS = {
  // Signature Series
  AZURE_DRIFT_WRAP: {
    id: 'azure-drift-wrap',
    name: 'The Azure Drift Wrap',
    price: 240,
    material: 'Fine merino wool blend',
    tagLabel: 'Frosty Blue',
    colorScheme: 'frosty-blue',
    imageUrl: '/assets/4.jpeg',
    category: 'Wraps',
    series: 'Signature',
  },
  PETAL_CARDIGAN: {
    id: 'petal-cardigan',
    name: 'Petal Cardigan',
    price: 380,
    material: 'Hand-dyed organic cotton',
    tagLabel: 'Blush Rose',
    colorScheme: 'pastel-pink',
    imageUrl: '/assets/5.jpeg',
    category: 'Cardigans',
    series: 'Signature',
  },
  ECLIPSE_THROW: {
    id: 'eclipse-throw',
    name: 'Eclipse Throw',
    price: 520,
    material: 'Weighted luxury alpaca yarn',
    tagLabel: 'Slate Charcoal',
    colorScheme: 'soft-lavender',
    imageUrl: '/assets/6.jpeg',
    category: 'Throws',
    series: 'Signature',
  },

  // Bouquet Flowers — individual crochet blooms
  ROSE: {
    id: 'rose',
    name: 'Crochet Rose',
    price: 120,
    emoji: '🌹',
    description: 'Classic red rose, hand-stitched petals',
    colorScheme: 'pastel-pink',
    imageUrl: '/assets/1.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
  TULIP: {
    id: 'tulip',
    name: 'Crochet Tulip',
    price: 100,
    emoji: '🌷',
    description: 'Delicate tulip in blush pink',
    colorScheme: 'frosty-blue',
    imageUrl: '/assets/2.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
  SUNFLOWER: {
    id: 'sunflower',
    name: 'Crochet Sunflower',
    price: 130,
    emoji: '🌻',
    description: 'Cheerful sunflower with golden yarn',
    colorScheme: 'warm-cream',
    imageUrl: '/assets/3.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
  LILY: {
    id: 'lily',
    name: 'Crochet Lily',
    price: 140,
    emoji: '🌸',
    description: 'Elegant white lily, pure cotton',
    colorScheme: 'soft-lavender',
    imageUrl: '/assets/6.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
  DAISY: {
    id: 'daisy',
    name: 'Crochet Daisy',
    price: 90,
    emoji: '🌼',
    description: 'Sweet little daisy, perfect filler',
    colorScheme: 'warm-cream',
    imageUrl: '/assets/4.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
  LAVENDER: {
    id: 'lavender',
    name: 'Crochet Lavender',
    price: 110,
    emoji: '💜',
    description: 'Sprig of lavender in lilac yarn',
    colorScheme: 'soft-lavender',
    imageUrl: '/assets/5.jpeg',
    category: 'Flowers',
    series: 'Bouquet',
  },
};

// Convenience arrays
export const ALL_PRODUCTS_LIST   = Object.values(PRODUCTS);
export const SIGNATURE_SERIES    = ALL_PRODUCTS_LIST.filter(p => p.series === 'Signature');
export const BOUQUET_FLOWERS     = ALL_PRODUCTS_LIST.filter(p => p.series === 'Bouquet');