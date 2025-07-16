
export interface Ingredient {
  id: string;
  name: string;
  casNo?: string;
  concentration?: number;
  quantity?: number;
  cost?: number;
  category?: string;
  subcategory?: string;
  description?: string;
  isLeaf?: boolean;
  children?: Ingredient[];

  // Extended attributes for detailed ingredient information (50+ attributes)
  olfactiveFamily?: string;
  topNote?: string;
  heartNote?: string;
  baseNote?: string;
  intensity?: string;
  longevity?: string;
  molecularWeight?: string;
  boilingPoint?: string;
  flashPoint?: string;
  solubility?: string;
  stability?: string;
  pH?: string;
  ifraCategory?: string;
  ifraRestriction?: string;
  euRegulation?: string;
  fdaStatus?: string;
  halalCertified?: string;
  vegan?: string;
  recommendedUsage?: string;
  blendsWellWith?: string;
  application?: string;
  storage?: string;
  shelfLife?: string;
  origin?: string;
  extractionMethod?: string;
  sustainabilityScore?: string;
  carbonFootprint?: string;
  biodegradability?: string;
  supplier?: string;
  purity?: string;
  odorDescription?: string;
  color?: string;
  appearance?: string;
  density?: string;
  refractiveIndex?: string;
  opticalRotation?: string;
  melitingPoint?: string;
  vapor?: string;
  threshold?: string;
  toxicity?: string;
  allergenicity?: string;
  photosensitivity?: string;
  skinIrritation?: string;
  eyeIrritation?: string;
  inhalationToxicity?: string;
  oralToxicity?: string;
  dermalToxicity?: string;
  mutagenicity?: string;
  carcinogenicity?: string;
  reproductiveToxicity?: string;
  aquaticToxicity?: string;
  terrestrialToxicity?: string;
  persistency?: string;
  bioaccumulation?: string;
  images?: string[];
}

export interface FormulaSection {
  id: string;
  name: string;
  percentage: string;
  ingredients: Ingredient[];
}

export const ingredientsData: Ingredient[] = [
  {
    id: 'natural',
    name: 'Natural',
    children: [
      {
        id: 'floral',
        name: 'Floral',
        children: [
          {
            id: 'lavender',
            name: 'Lavender',
            children: [
              {
                id: 'lavender-essential-oil',
                name: 'Lavender Essential Oil',
                casNo: '470-82-6',
                concentration: 10,
                quantity: 10,
                cost: 40,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Pure lavender essential oil with calming properties',
                isLeaf: true,
                olfactiveFamily: 'Aromatic Fougere',
                topNote: 'Fresh, Herbaceous, Camphoraceous',
                heartNote: 'Floral, Sweet, Lavender',
                baseNote: 'Woody, Balsamic',
                intensity: '7/10',
                longevity: '4-6 hours',
                molecularWeight: '154.25 g/mol',
                boilingPoint: '195-198°C',
                flashPoint: '74°C',
                solubility: 'Ethanol, Essential oils',
                stability: 'Stable under normal conditions, avoid heat and light',
                pH: '6.0-7.0',
                ifraCategory: 'Category 1-11',
                ifraRestriction: '0.25% in fine fragrance',
                euRegulation: 'Listed in Annex III',
                fdaStatus: 'GRAS',
                halalCertified: 'Yes',
                vegan: 'Yes',
                recommendedUsage: '0.1-1.0% in fine fragrance',
                blendsWellWith: 'Rosemary, Bergamot, Lemon, Geranium',
                application: 'Fine Fragrance, Aromatherapy, Cosmetics',
                storage: 'Cool, dry place, dark container',
                shelfLife: '36 months',
                origin: 'France, Bulgaria',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '9/10',
                carbonFootprint: 'Low',
                biodegradability: 'Readily biodegradable',
                supplier: 'Premium Essential Oils Ltd.',
                purity: '98%+',
                odorDescription: 'Fresh, floral, herbaceous with camphoraceous top notes',
                color: 'Colorless to pale yellow',
                appearance: 'Clear liquid',
                density: '0.876-0.892 g/cm³',
                refractiveIndex: '1.459-1.470',
                opticalRotation: '-12° to -6°',
                melitingPoint: 'N/A (liquid)',
                vapor: 'Low',
                threshold: '0.1 ppm',
                toxicity: 'Low',
                allergenicity: 'May cause skin sensitization in rare cases',
                photosensitivity: 'None',
                skinIrritation: 'Minimal',
                eyeIrritation: 'Mild',
                inhalationToxicity: 'Low',
                oralToxicity: 'LD50 > 2000 mg/kg',
                dermalToxicity: 'LD50 > 2000 mg/kg',
                mutagenicity: 'Not mutagenic',
                carcinogenicity: 'Not carcinogenic',
                reproductiveToxicity: 'None',
                aquaticToxicity: 'Low',
                terrestrialToxicity: 'Low',
                persistency: 'Low',
                bioaccumulation: 'Low',
                images: ['lavender_field.jpg', 'lavender_oil.jpg', 'lavender_distillation.jpg']
              },
              {
                id: 'lavender-absolute',
                name: 'Lavender Absolute',
                casNo: '470-82-6',
                concentration: 15,
                quantity: 5,
                cost: 60,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Concentrated lavender absolute for deep floral notes',
                isLeaf: true,
                olfactiveFamily: 'Aromatic Floral',
                topNote: 'Green, Fresh, Herbaceous',
                heartNote: 'Rich Floral, Lavender, Honey',
                baseNote: 'Woody, Coumarin-like',
                intensity: '8/10',
                longevity: '6-8 hours',
                molecularWeight: '154.25 g/mol',
                boilingPoint: '195-198°C',
                flashPoint: '65°C',
                solubility: 'Ethanol, Dipropylene glycol',
                stability: 'Stable, avoid extreme temperatures',
                pH: '5.5-6.5',
                ifraCategory: 'Category 1-11',
                ifraRestriction: '0.1% in fine fragrance',
                euRegulation: 'Listed in Annex III',
                fdaStatus: 'GRAS',
                halalCertified: 'Yes',
                vegan: 'Yes',
                recommendedUsage: '0.05-0.5% in fine fragrance',
                blendsWellWith: 'Rose, Jasmine, Sandalwood, Vanilla',
                application: 'Fine Fragrance, Luxury Cosmetics',
                storage: 'Refrigerated, dark container',
                shelfLife: '24 months',
                origin: 'France',
                extractionMethod: 'Solvent Extraction',
                sustainabilityScore: '8/10',
                carbonFootprint: 'Medium',
                biodegradability: 'Readily biodegradable'
              }
            ]
          },
          {
            id: 'rose',
            name: 'Rose',
            children: [
              {
                id: 'rose-otto',
                name: 'Rose Otto',
                casNo: '8007-01-0',
                concentration: 20,
                quantity: 2,
                cost: 120,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Premium Bulgarian rose otto oil',
                isLeaf: true,
                olfactiveFamily: 'Floral Rose',
                topNote: 'Fresh, Green, Citrusy',
                heartNote: 'Rich Rose, Floral, Honey',
                baseNote: 'Woody, Spicy',
                intensity: '9/10',
                longevity: '8-12 hours',
                molecularWeight: '154.25 g/mol',
                boilingPoint: '230°C',
                flashPoint: '96°C',
                solubility: 'Ethanol, Essential oils',
                stability: 'Stable, crystallizes at low temperatures',
                pH: '6.0-7.0',
                ifraCategory: 'Category 1-11',
                ifraRestriction: 'No restriction',
                euRegulation: 'Compliant',
                fdaStatus: 'GRAS',
                halalCertified: 'Yes',
                vegan: 'Yes',
                recommendedUsage: '0.01-0.1% in fine fragrance',
                blendsWellWith: 'Jasmine, Sandalwood, Patchouli, Bergamot',
                application: 'Fine Fragrance, Luxury Perfumes',
                storage: 'Cool place, may crystallize below 16°C',
                shelfLife: '60 months',
                origin: 'Bulgaria, Turkey',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10',
                carbonFootprint: 'High',
                biodegradability: 'Readily biodegradable'
              },
              {
                id: 'rose-absolute',
                name: 'Rose Absolute',
                casNo: '8007-01-0',
                concentration: 12,
                quantity: 8,
                cost: 85,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Rich and intense rose absolute',
                isLeaf: true,
                olfactiveFamily: 'Floral Rose',
                topNote: 'Green, Spicy',
                heartNote: 'Deep Rose, Floral, Wine-like',
                baseNote: 'Woody, Honeyed',
                intensity: '9/10',
                longevity: '10-14 hours',
                recommendedUsage: '0.05-0.3% in fine fragrance',
                extractionMethod: 'Solvent Extraction',
                sustainabilityScore: '6/10'
              }
            ]
          },
          {
            id: 'jasmine',
            name: 'Jasmine',
            children: [
              {
                id: 'jasmine-sambac',
                name: 'Jasmine Sambac',
                casNo: '8022-96-6',
                concentration: 18,
                quantity: 3,
                cost: 95,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Exotic jasmine sambac absolute',
                isLeaf: true,
                olfactiveFamily: 'Floral White Flowers',
                topNote: 'Green, Fresh, Fruity',
                heartNote: 'Rich Jasmine, Narcotic, Indolic',
                baseNote: 'Animalic, Musky',
                intensity: '10/10',
                longevity: '12-16 hours',
                recommendedUsage: '0.01-0.2% in fine fragrance',
                extractionMethod: 'Solvent Extraction',
                sustainabilityScore: '6/10'
              },
              {
                id: 'jasmine-grandiflorum',
                name: 'Jasmine Grandiflorum',
                casNo: '8022-96-6',
                concentration: 16,
                quantity: 4,
                cost: 110,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Classic French jasmine absolute',
                isLeaf: true,
                olfactiveFamily: 'Floral White Flowers',
                topNote: 'Green, Tea-like',
                heartNote: 'Jasmine, Indolic, Narcotic',
                baseNote: 'Animalic, Honey',
                intensity: '9/10',
                longevity: '10-16 hours',
                recommendedUsage: '0.01-0.3% in fine fragrance',
                extractionMethod: 'Solvent Extraction',
                sustainabilityScore: '6/10'
              }
            ]
          },
          {
            id: 'ylang-ylang',
            name: 'Ylang Ylang',
            children: [
              {
                id: 'ylang-ylang-extra',
                name: 'Ylang Ylang Extra',
                casNo: '8006-81-3',
                concentration: 14,
                quantity: 12,
                cost: 55,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Exotic tropical floral with creamy facets',
                isLeaf: true,
                olfactiveFamily: 'Floral Exotic',
                topNote: 'Fresh, Green, Banana-like',
                heartNote: 'Ylang, Creamy, Custard',
                baseNote: 'Woody, Balsamic',
                intensity: '9/10',
                longevity: '8-12 hours',
                recommendedUsage: '0.1-1% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10'
              }
            ]
          },
          {
            id: 'neroli',
            name: 'Neroli',
            children: [
              {
                id: 'neroli-oil',
                name: 'Neroli Oil',
                casNo: '8016-38-4',
                concentration: 12,
                quantity: 6,
                cost: 95,
                category: 'Natural',
                subcategory: 'Floral',
                description: 'Orange blossom oil with fresh citrus florals',
                isLeaf: true,
                olfactiveFamily: 'Floral Citrus',
                topNote: 'Fresh, Citrus, Green',
                heartNote: 'Orange blossom, Floral, Honey',
                baseNote: 'Slightly woody',
                intensity: '8/10',
                longevity: '6-10 hours',
                recommendedUsage: '0.1-2% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '8/10'
              }
            ]
          }
        ]
      },
      {
        id: 'citrus',
        name: 'Citrus',
        children: [
          {
            id: 'bergamot',
            name: 'Bergamot',
            children: [
              {
                id: 'bergamot-oil',
                name: 'Bergamot Oil',
                casNo: '8007-75-8',
                concentration: 25,
                quantity: 15,
                cost: 35,
                category: 'Natural',
                subcategory: 'Citrus',
                description: 'Fresh Italian bergamot essential oil',
                isLeaf: true,
                olfactiveFamily: 'Citrus',
                topNote: 'Fresh, Citrus, Earl Grey',
                heartNote: 'Floral, Lavender-like',
                baseNote: 'Woody, Balsamic',
                intensity: '8/10',
                longevity: '2-4 hours',
                recommendedUsage: '1-10% in fine fragrance',
                extractionMethod: 'Cold Expression',
                sustainabilityScore: '8/10',
                photosensitivity: 'High - contains bergapten'
              }
            ]
          },
          {
            id: 'lemon',
            name: 'Lemon',
            children: [
              {
                id: 'lemon-oil',
                name: 'Lemon Oil',
                casNo: '8008-56-8',
                concentration: 30,
                quantity: 12,
                cost: 25,
                category: 'Natural',
                subcategory: 'Citrus',
                description: 'Bright and zesty lemon essential oil',
                isLeaf: true,
                olfactiveFamily: 'Citrus',
                topNote: 'Fresh, Sharp, Citrus',
                heartNote: 'Sweet, Fruity',
                baseNote: 'Clean, Light',
                intensity: '9/10',
                longevity: '1-3 hours',
                recommendedUsage: '2-15% in fine fragrance',
                extractionMethod: 'Cold Expression',
                sustainabilityScore: '9/10'
              }
            ]
          },
          {
            id: 'grapefruit',
            name: 'Grapefruit',
            children: [
              {
                id: 'grapefruit-oil',
                name: 'Grapefruit Oil',
                casNo: '8016-20-4',
                concentration: 28,
                quantity: 18,
                cost: 30,
                category: 'Natural',
                subcategory: 'Citrus',
                description: 'Fresh, tart grapefruit essential oil',
                isLeaf: true,
                olfactiveFamily: 'Citrus',
                topNote: 'Fresh, Tart, Juicy',
                heartNote: 'Bitter, Zesty',
                baseNote: 'Clean, Fresh',
                intensity: '8/10',
                longevity: '1-3 hours',
                recommendedUsage: '2-12% in fine fragrance',
                extractionMethod: 'Cold Expression',
                sustainabilityScore: '9/10'
              }
            ]
          },
          {
            id: 'sweet-orange',
            name: 'Sweet Orange',
            children: [
              {
                id: 'sweet-orange-oil',
                name: 'Sweet Orange Oil',
                casNo: '8008-57-9',
                concentration: 32,
                quantity: 20,
                cost: 22,
                category: 'Natural',
                subcategory: 'Citrus',
                description: 'Sweet, juicy orange essential oil',
                isLeaf: true,
                olfactiveFamily: 'Citrus',
                topNote: 'Fresh, Sweet, Juicy',
                heartNote: 'Orange peel, Fruity',
                baseNote: 'Soft, Clean',
                intensity: '7/10',
                longevity: '1-3 hours',
                recommendedUsage: '3-15% in fine fragrance',
                extractionMethod: 'Cold Expression',
                sustainabilityScore: '9/10'
              }
            ]
          },
          {
            id: 'lime',
            name: 'Lime',
            children: [
              {
                id: 'lime-oil',
                name: 'Lime Oil',
                casNo: '8008-26-2',
                concentration: 26,
                quantity: 14,
                cost: 28,
                category: 'Natural',
                subcategory: 'Citrus',
                description: 'Sharp, fresh lime essential oil',
                isLeaf: true,
                olfactiveFamily: 'Citrus',
                topNote: 'Sharp, Fresh, Zesty',
                heartNote: 'Lime peel, Tart',
                baseNote: 'Clean, Light',
                intensity: '9/10',
                longevity: '1-2 hours',
                recommendedUsage: '2-10% in fine fragrance',
                extractionMethod: 'Cold Expression',
                sustainabilityScore: '8/10'
              }
            ]
          }
        ]
      },
      {
        id: 'woody',
        name: 'Woody',
        children: [
          {
            id: 'sandalwood',
            name: 'Sandalwood',
            children: [
              {
                id: 'sandalwood-oil',
                name: 'Sandalwood Oil',
                casNo: '8006-87-9',
                concentration: 8,
                quantity: 20,
                cost: 150,
                category: 'Natural',
                subcategory: 'Woody',
                description: 'Premium Australian sandalwood oil',
                isLeaf: true,
                olfactiveFamily: 'Woody',
                topNote: 'Soft, Creamy',
                heartNote: 'Woody, Milky, Balsamic',
                baseNote: 'Warm, Smooth, Lasting',
                intensity: '7/10',
                longevity: '8-12 hours',
                recommendedUsage: '0.5-5% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '5/10',
                origin: 'Australia (sustainable plantation)'
              }
            ]
          },
          {
            id: 'cedarwood',
            name: 'Cedarwood',
            children: [
              {
                id: 'cedarwood-oil',
                name: 'Cedarwood Oil',
                casNo: '8000-27-9',
                concentration: 12,
                quantity: 18,
                cost: 30,
                category: 'Natural',
                subcategory: 'Woody',
                description: 'Warm and grounding cedarwood essential oil',
                isLeaf: true,
                olfactiveFamily: 'Woody',
                topNote: 'Fresh, Woody',
                heartNote: 'Dry, Cedar, Pencil shavings',
                baseNote: 'Warm, Balsamic',
                intensity: '6/10',
                longevity: '6-10 hours',
                recommendedUsage: '1-8% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '8/10'
              }
            ]
          },
          {
            id: 'patchouli',
            name: 'Patchouli',
            children: [
              {
                id: 'patchouli-oil',
                name: 'Patchouli Oil',
                casNo: '8014-09-3',
                concentration: 6,
                quantity: 25,
                cost: 45,
                category: 'Natural',
                subcategory: 'Woody',
                description: 'Deep, earthy patchouli essential oil',
                isLeaf: true,
                olfactiveFamily: 'Woody Earthy',
                topNote: 'Herbal, Medicinal',
                heartNote: 'Earthy, Woody, Musky',
                baseNote: 'Sweet, Balsamic, Lasting',
                intensity: '9/10',
                longevity: '12-24 hours',
                recommendedUsage: '0.1-3% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '8/10'
              }
            ]
          },
          {
            id: 'vetiver',
            name: 'Vetiver',
            children: [
              {
                id: 'vetiver-oil',
                name: 'Vetiver Oil',
                casNo: '8016-96-4',
                concentration: 5,
                quantity: 15,
                cost: 65,
                category: 'Natural',
                subcategory: 'Woody',
                description: 'Smoky, woody vetiver root oil',
                isLeaf: true,
                olfactiveFamily: 'Woody Smoky',
                topNote: 'Green, Fresh, Smoky',
                heartNote: 'Woody, Earthy, Rooty',
                baseNote: 'Dry, Smoky, Lasting',
                intensity: '8/10',
                longevity: '10-16 hours',
                recommendedUsage: '0.1-2% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10'
              }
            ]
          }
        ]
      },
      {
        id: 'spices',
        name: 'Spices',
        children: [
          {
            id: 'black-pepper',
            name: 'Black Pepper',
            children: [
              {
                id: 'black-pepper-oil',
                name: 'Black Pepper Oil',
                casNo: '8006-82-4',
                concentration: 5,
                quantity: 8,
                cost: 45,
                category: 'Natural',
                subcategory: 'Spices',
                description: 'Spicy and warm black pepper essential oil',
                isLeaf: true,
                olfactiveFamily: 'Spicy',
                topNote: 'Sharp, Peppery, Hot',
                heartNote: 'Warm, Woody, Spicy',
                baseNote: 'Woody, Dry',
                intensity: '8/10',
                longevity: '4-6 hours',
                recommendedUsage: '0.1-1% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10'
              }
            ]
          },
          {
            id: 'cardamom',
            name: 'Cardamom',
            children: [
              {
                id: 'cardamom-oil',
                name: 'Cardamom Oil',
                casNo: '8000-68-8',
                concentration: 4,
                quantity: 10,
                cost: 85,
                category: 'Natural',
                subcategory: 'Spices',
                description: 'Warm, aromatic cardamom essential oil',
                isLeaf: true,
                olfactiveFamily: 'Spicy Aromatic',
                topNote: 'Fresh, Eucalyptus-like',
                heartNote: 'Warm, Spicy, Woody',
                baseNote: 'Balsamic, Soft',
                intensity: '7/10',
                longevity: '4-8 hours',
                recommendedUsage: '0.1-0.5% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10'
              }
            ]
          },
          {
            id: 'cinnamon',
            name: 'Cinnamon',
            children: [
              {
                id: 'cinnamon-leaf-oil',
                name: 'Cinnamon Leaf Oil',
                casNo: '8015-91-6',
                concentration: 3,
                quantity: 8,
                cost: 40,
                category: 'Natural',
                subcategory: 'Spices',
                description: 'Warm, spicy cinnamon leaf oil',
                isLeaf: true,
                olfactiveFamily: 'Spicy',
                topNote: 'Spicy, Hot, Clove-like',
                heartNote: 'Cinnamon, Warm, Sweet',
                baseNote: 'Woody, Dry',
                intensity: '9/10',
                longevity: '6-8 hours',
                recommendedUsage: '0.05-0.3% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '7/10'
              }
            ]
          }
        ]
      },
      {
        id: 'resins',
        name: 'Resins & Balsams',
        children: [
          {
            id: 'frankincense',
            name: 'Frankincense',
            children: [
              {
                id: 'frankincense-oil',
                name: 'Frankincense Oil',
                casNo: '8016-36-2',
                concentration: 8,
                quantity: 12,
                cost: 75,
                category: 'Natural',
                subcategory: 'Resins',
                description: 'Sacred frankincense resin oil',
                isLeaf: true,
                olfactiveFamily: 'Resinous',
                topNote: 'Fresh, Lemony, Pine-like',
                heartNote: 'Resinous, Balsamic, Spicy',
                baseNote: 'Woody, Warm, Lasting',
                intensity: '7/10',
                longevity: '8-12 hours',
                recommendedUsage: '0.5-3% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '6/10'
              }
            ]
          },
          {
            id: 'benzoin',
            name: 'Benzoin',
            children: [
              {
                id: 'benzoin-resinoid',
                name: 'Benzoin Resinoid',
                casNo: '9000-72-0',
                concentration: 10,
                quantity: 8,
                cost: 55,
                category: 'Natural',
                subcategory: 'Resins',
                description: 'Sweet, vanilla-like benzoin resin',
                isLeaf: true,
                olfactiveFamily: 'Balsamic Sweet',
                topNote: 'Sweet, Vanilla-like',
                heartNote: 'Balsamic, Honey, Cinnamon',
                baseNote: 'Warm, Powdery, Lasting',
                intensity: '8/10',
                longevity: '10-16 hours',
                recommendedUsage: '0.5-5% in fine fragrance',
                extractionMethod: 'Solvent Extraction',
                sustainabilityScore: '7/10'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'synthetic',
    name: 'Synthetic',
    children: [
      {
        id: 'aldehydes',
        name: 'Aldehydes',
        children: [
          {
            id: 'aldehyde-c12',
            name: 'Aldehyde C-12',
            casNo: '112-54-9',
            concentration: 5,
            quantity: 25,
            cost: 45,
            category: 'Synthetic',
            subcategory: 'Aldehydes',
            description: 'Clean, powdery aldehyde with metallic facets',
            isLeaf: true,
            olfactiveFamily: 'Aldehydic',
            topNote: 'Metallic, Soapy, Clean',
            heartNote: 'Powdery, Waxy',
            baseNote: 'Fatty, Slight',
            intensity: '9/10',
            longevity: '4-8 hours',
            recommendedUsage: '0.01-0.1% in fine fragrance',
            sustainabilityScore: '7/10',
            biodegradability: 'Readily biodegradable'
          }
        ]
      },
      {
        id: 'musks',
        name: 'Musks',
        children: [
          {
            id: 'white-musk',
            name: 'White Musk',
            casNo: '3391-83-1',
            concentration: 15,
            quantity: 30,
            cost: 55,
            category: 'Synthetic',
            subcategory: 'Musks',
            description: 'Clean, soft white musk molecule',
            isLeaf: true,
            olfactiveFamily: 'Musky',
            topNote: 'Clean, Fresh',
            heartNote: 'Soft, Powdery, Musky',
            baseNote: 'Lasting, Skin-like',
            intensity: '6/10',
            longevity: '12-24 hours',
            recommendedUsage: '0.5-10% in fine fragrance',
            sustainabilityScore: '8/10'
          },
          {
            id: 'galaxolide',
            name: 'Galaxolide',
            casNo: '1222-05-5',
            concentration: 18,
            quantity: 40,
            cost: 42,
            category: 'Synthetic',
            subcategory: 'Musks',
            description: 'Clean, powdery musk with excellent diffusion',
            isLeaf: true,
            olfactiveFamily: 'Musky Clean',
            topNote: 'Clean, Fresh, Aldehydic',
            heartNote: 'Musky, Powdery, Floral',
            baseNote: 'Lasting, Skin-like, Soft',
            intensity: '7/10',
            longevity: '12-20 hours',
            recommendedUsage: '1-15% in fine fragrance',
            sustainabilityScore: '8/10'
          }
        ]
      },
      {
        id: 'esters',
        name: 'Esters',
        children: [
          {
            id: 'iso-e-super',
            name: 'Iso E Super',
            casNo: '54464-57-2',
            concentration: 20,
            quantity: 50,
            cost: 65,
            category: 'Synthetic',
            subcategory: 'Esters',
            description: 'Smooth woody musky synthetic molecule',
            isLeaf: true,
            olfactiveFamily: 'Woody Musky',
            topNote: 'Soft, Woody',
            heartNote: 'Cedarwood, Velvety',
            baseNote: 'Musky, Radiant',
            intensity: '5/10',
            longevity: '6-12 hours',
            recommendedUsage: '5-30% in fine fragrance',
            sustainabilityScore: '9/10',
            biodegradability: 'Readily biodegradable'
          },
          {
            id: 'ambroxan',
            name: 'Ambroxan',
            casNo: '6790-58-5',
            concentration: 12,
            quantity: 35,
            cost: 78,
            category: 'Synthetic',
            subcategory: 'Esters',
            description: 'Warm, ambery synthetic with excellent longevity',
            isLeaf: true,
            olfactiveFamily: 'Woody Amber',
            topNote: 'Soft, Woody, Marine',
            heartNote: 'Amber, Woody, Mineral',
            baseNote: 'Warm, Lasting, Radiant',
            intensity: '6/10',
            longevity: '8-16 hours',
            recommendedUsage: '1-20% in fine fragrance',
            sustainabilityScore: '9/10'
          }
        ]
      },
      {
        id: 'woody-synthetics',
        name: 'Woody Synthetics',
        children: [
          {
            id: 'cashmeran',
            name: 'Cashmeran',
            casNo: '33704-61-9',
            concentration: 10,
            quantity: 28,
            cost: 58,
            category: 'Synthetic',
            subcategory: 'Woody Synthetics',
            description: 'Soft, musky-woody synthetic with spicy facets',
            isLeaf: true,
            olfactiveFamily: 'Woody Musky',
            topNote: 'Soft, Spicy',
            heartNote: 'Woody, Musky, Pine',
            baseNote: 'Soft, Lasting, Warm',
            intensity: '6/10',
            longevity: '8-12 hours',
            recommendedUsage: '2-15% in fine fragrance',
            sustainabilityScore: '9/10'
          },
          {
            id: 'cedryl-acetate',
            name: 'Cedryl Acetate',
            casNo: '77-54-3',
            concentration: 8,
            quantity: 22,
            cost: 48,
            category: 'Synthetic',
            subcategory: 'Woody Synthetics',
            description: 'Smooth, woody-coniferous synthetic',
            isLeaf: true,
            olfactiveFamily: 'Woody Coniferous',
            topNote: 'Fresh, Woody, Coniferous',
            heartNote: 'Cedar, Woody, Smooth',
            baseNote: 'Dry, Lasting, Clean',
            intensity: '6/10',
            longevity: '6-10 hours',
            recommendedUsage: '1-10% in fine fragrance',
            sustainabilityScore: '8/10'
          }
        ]
      }
    ]
  },
  {
    id: 'aroma-chemicals',
    name: 'Aroma Chemicals',
    children: [
      {
        id: 'alcohols',
        name: 'Alcohols',
        children: [
          {
            id: 'phenylethyl-alcohol',
            name: 'Phenylethyl Alcohol',
            casNo: '60-12-8',
            concentration: 10,
            quantity: 20,
            cost: 35,
            category: 'Aroma Chemicals',
            subcategory: 'Alcohols',
            description: 'Rose-like alcohol with honey facets',
            isLeaf: true,
            olfactiveFamily: 'Floral',
            topNote: 'Fresh, Green',
            heartNote: 'Rose, Honey, Floral',
            baseNote: 'Soft, Powdery',
            intensity: '7/10',
            longevity: '4-8 hours',
            recommendedUsage: '0.1-2% in fine fragrance',
            sustainabilityScore: '8/10'
          },
          {
            id: 'benzyl-alcohol',
            name: 'Benzyl Alcohol',
            casNo: '100-51-6',
            concentration: 8,
            quantity: 25,
            cost: 28,
            category: 'Aroma Chemicals',
            subcategory: 'Alcohols',
            description: 'Mild, sweet, floral alcohol',
            isLeaf: true,
            olfactiveFamily: 'Floral Sweet',
            topNote: 'Sweet, Mild, Floral',
            heartNote: 'Rose-like, Soft',
            baseNote: 'Clean, Light',
            intensity: '5/10',
            longevity: '3-6 hours',
            recommendedUsage: '0.5-5% in fine fragrance',
            sustainabilityScore: '9/10'
          }
        ]
      },
      {
        id: 'ketones',
        name: 'Ketones',
        children: [
          {
            id: 'methyl-ionone',
            name: 'Methyl Ionone',
            casNo: '127-42-4',
            concentration: 8,
            quantity: 15,
            cost: 42,
            category: 'Aroma Chemicals',
            subcategory: 'Ketones',
            description: 'Violet-like ketone with powdery notes',
            isLeaf: true,
            olfactiveFamily: 'Floral Violet',
            topNote: 'Green, Fruity',
            heartNote: 'Violet, Powdery, Orris',
            baseNote: 'Woody, Dry',
            intensity: '7/10',
            longevity: '6-10 hours',
            recommendedUsage: '0.1-1% in fine fragrance',
            sustainabilityScore: '7/10'
          },
          {
            id: 'calone',
            name: 'Calone',
            casNo: '28940-11-6',
            concentration: 2,
            quantity: 10,
            cost: 65,
            category: 'Aroma Chemicals',
            subcategory: 'Ketones',
            description: 'Fresh, marine, ozonic ketone',
            isLeaf: true,
            olfactiveFamily: 'Aquatic',
            topNote: 'Fresh, Marine, Ozonic',
            heartNote: 'Melon, Watery, Green',
            baseNote: 'Clean, Light',
            intensity: '9/10',
            longevity: '3-6 hours',
            recommendedUsage: '0.01-0.1% in fine fragrance',
            sustainabilityScore: '8/10'
          }
        ]
      },
      {
        id: 'phenols',
        name: 'Phenols',
        children: [
          {
            id: 'eugenol',
            name: 'Eugenol',
            casNo: '97-53-0',
            concentration: 6,
            quantity: 18,
            cost: 38,
            category: 'Aroma Chemicals',
            subcategory: 'Phenols',
            description: 'Clove-like phenol with spicy facets',
            isLeaf: true,
            olfactiveFamily: 'Spicy',
            topNote: 'Spicy, Clove-like, Hot',
            heartNote: 'Woody, Spicy, Carnation',
            baseNote: 'Warm, Balsamic',
            intensity: '8/10',
            longevity: '6-10 hours',
            recommendedUsage: '0.1-1% in fine fragrance',
            sustainabilityScore: '7/10'
          }
        ]
      }
    ]
  },
  {
    id: 'botanical-extracts',
    name: 'Botanical Extracts',
    children: [
      {
        id: 'herbs',
        name: 'Herbs',
        children: [
          {
            id: 'rosemary',
            name: 'Rosemary',
            children: [
              {
                id: 'rosemary-extract',
                name: 'Rosemary Extract',
                casNo: '8000-25-7',
                concentration: 12,
                quantity: 10,
                cost: 28,
                category: 'Botanical Extracts',
                subcategory: 'Herbs',
                description: 'Fresh herbal rosemary extract',
                isLeaf: true,
                olfactiveFamily: 'Aromatic Herbal',
                topNote: 'Fresh, Herbaceous, Camphor',
                heartNote: 'Pine, Eucalyptus, Minty',
                baseNote: 'Woody, Balsamic',
                intensity: '8/10',
                longevity: '3-6 hours',
                recommendedUsage: '0.1-1% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '9/10'
              }
            ]
          },
          {
            id: 'basil',
            name: 'Basil',
            children: [
              {
                id: 'basil-oil',
                name: 'Basil Oil',
                casNo: '8015-73-4',
                concentration: 10,
                quantity: 12,
                cost: 35,
                category: 'Botanical Extracts',
                subcategory: 'Herbs',
                description: 'Fresh, green basil essential oil',
                isLeaf: true,
                olfactiveFamily: 'Aromatic Herbal',
                topNote: 'Fresh, Green, Herbal',
                heartNote: 'Sweet Basil, Spicy, Anise',
                baseNote: 'Woody, Slight',
                intensity: '8/10',
                longevity: '3-5 hours',
                recommendedUsage: '0.1-0.8% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '9/10'
              }
            ]
          },
          {
            id: 'mint',
            name: 'Mint',
            children: [
              {
                id: 'peppermint-oil',
                name: 'Peppermint Oil',
                casNo: '8006-90-4',
                concentration: 15,
                quantity: 15,
                cost: 32,
                category: 'Botanical Extracts',
                subcategory: 'Herbs',
                description: 'Cool, refreshing peppermint oil',
                isLeaf: true,
                olfactiveFamily: 'Aromatic Minty',
                topNote: 'Fresh, Cool, Minty',
                heartNote: 'Menthol, Herbaceous',
                baseNote: 'Woody, Slight',
                intensity: '9/10',
                longevity: '2-4 hours',
                recommendedUsage: '0.1-1% in fine fragrance',
                extractionMethod: 'Steam Distillation',
                sustainabilityScore: '9/10'
              }
            ]
          }
        ]
      },
      {
        id: 'fruits',
        name: 'Fruit Extracts',
        children: [
          {
            id: 'apple',
            name: 'Apple',
            children: [
              {
                id: 'apple-extract',
                name: 'Green Apple Extract',
                casNo: 'Natural Extract',
                concentration: 20,
                quantity: 18,
                cost: 45,
                category: 'Botanical Extracts',
                subcategory: 'Fruits',
                description: 'Fresh, crisp green apple extract',
                isLeaf: true,
                olfactiveFamily: 'Fruity',
                topNote: 'Fresh, Green, Juicy',
                heartNote: 'Apple, Crisp, Sweet',
                baseNote: 'Soft, Light',
                intensity: '7/10',
                longevity: '3-6 hours',
                recommendedUsage: '0.5-3% in fine fragrance',
                extractionMethod: 'CO2 Extraction',
                sustainabilityScore: '8/10'
              }
            ]
          }
        ]
      }
    ]
  }
];

export const defaultSections: FormulaSection[] = [
  {
    id: 'top-notes',
    name: 'Top Notes',
    percentage: '20-30%',
    ingredients: []
  },
  {
    id: 'middle-notes',
    name: 'Middle/Heart Notes',
    percentage: '20-30%',
    ingredients: []
  },
  {
    id: 'base-notes',
    name: 'Base Notes',
    percentage: '20-30%',
    ingredients: []
  }
];
