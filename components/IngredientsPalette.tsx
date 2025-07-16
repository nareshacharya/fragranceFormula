
'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Ingredient } from '@/lib/ingredientsData';

interface DraggableIngredientProps {
  ingredient: Ingredient;
  isDisabled?: boolean;
}

function DraggableIngredient({ ingredient, isDisabled = false }: DraggableIngredientProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ingredient.id,
    data: { ingredient },
    disabled: isDisabled
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white border border-gray-200 rounded-lg p-3 transition-all ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed bg-gray-50'
          : 'cursor-grab hover:shadow-md'
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="text-base font-medium text-gray-900">{ingredient.name}</div>
      {ingredient.casNo && (
        <div className="text-sm text-gray-500 mt-1">CAS: {ingredient.casNo}</div>
      )}
      {ingredient.concentration && (
        <div className="text-sm text-blue-600 mt-1">{ingredient.concentration}%</div>
      )}
      {isDisabled && (
        <div className="text-xs text-orange-600 mt-1 font-medium">Already in use</div>
      )}
    </div>
  );
}

interface IngredientNodeProps {
  ingredient: Ingredient;
  level: number;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  searchTerm: string;
  usedIngredientIds: string[];
}

function IngredientNode({ ingredient, level, expandedNodes, onToggle, searchTerm, usedIngredientIds }: IngredientNodeProps) {
  const hasChildren = ingredient.children && ingredient.children.length > 0;
  const isExpanded = expandedNodes.has(ingredient.id);
  const isLeaf = ingredient.isLeaf;
  const isUsed = usedIngredientIds.includes(ingredient.id);

  // Global search function that searches at all levels
  const matchesSearch = (ing: Ingredient, term: string): boolean => {
    if (!term) return true;

    const searchLower = term.toLowerCase();
    const nameMatch = ing.name.toLowerCase().includes(searchLower);
    const casMatch = ing.casNo?.toLowerCase().includes(searchLower) || false;
    const categoryMatch = ing.category?.toLowerCase().includes(searchLower) || false;
    const subcategoryMatch = ing.subcategory?.toLowerCase().includes(searchLower) || false;

    return nameMatch || casMatch || categoryMatch || subcategoryMatch;
  };

  // Check if this ingredient or any of its children match the search
  const hasMatchingDescendant = (ing: Ingredient, term: string): boolean => {
    if (matchesSearch(ing, term)) return true;
    if (ing.children) {
      return ing.children.some(child => hasMatchingDescendant(child, term));
    }
    return false;
  };

  // Don't render if search doesn't match this node or its descendants
  if (searchTerm && !hasMatchingDescendant(ingredient, searchTerm)) {
    return null;
  }

  const handleClick = () => {
    if (hasChildren) {
      onToggle(ingredient.id);
    }
  };

  // Reduced padding based on level
  const paddingLeft = level * 8;

  if (isLeaf) {
    return (
      <div style={{ paddingLeft: paddingLeft + 4, minWidth: '280px' }} className="py-1">
        <DraggableIngredient ingredient={ingredient} isDisabled={isUsed} />
      </div>
    );
  }

  // Level 1 - Main categories (Floral, Citrus, etc.)
  if (level === 1) {
    return (
      <div style={{ minWidth: '280px' }}>
        <div
          className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
          style={{ paddingLeft: `${paddingLeft}px`, minWidth: '280px' }}
          onClick={handleClick}
        >
          <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
            <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
          </div>
          <div className="w-20 h-20 mr-3 flex-shrink-0 relative rounded border-2 bg-blue-100 border-blue-300 text-blue-800 flex items-center justify-center">
            <span className="text-base font-semibold text-center leading-tight px-2 break-words word-break-break-word overflow-hidden">
              {ingredient.name}
            </span>
          </div>
          <span className="text-gray-700 text-base font-medium flex-1 ml-2 break-words word-break-break-word">
            {ingredient.name}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {ingredient.children?.map((child) => (
              <IngredientNode
                key={child.id}
                ingredient={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                searchTerm={searchTerm}
                usedIngredientIds={usedIngredientIds}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Level 2 - Subcategories (Rose, Jasmine, etc.)
  if (level === 2) {
    return (
      <div style={{ minWidth: '280px' }}>
        <div
          className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
          style={{ paddingLeft: `${paddingLeft}px`, minWidth: '280px' }}
          onClick={handleClick}
        >
          <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
            <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
          </div>
          <div className="w-16 h-16 mr-3 flex-shrink-0 relative rounded border bg-green-100 border-green-300 text-green-800 flex items-center justify-center">
            <span className="text-sm font-medium text-center leading-tight px-2 break-words word-break-break-word overflow-hidden">
              {ingredient.name}
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium flex-1 ml-2 break-words word-break-break-word">
            {ingredient.name}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {ingredient.children?.map((child) => (
              <IngredientNode
                key={child.id}
                ingredient={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                searchTerm={searchTerm}
                usedIngredientIds={usedIngredientIds}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Level 3+ - Individual ingredients or further subcategories
  return (
    <div style={{ minWidth: '280px' }}>
      <div
        className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
        style={{ paddingLeft: `${paddingLeft}px`, minWidth: '280px' }}
        onClick={handleClick}
      >
        <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
          <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
        </div>
        <div className="w-full h-16 relative rounded border bg-purple-100 border-purple-300 text-purple-800 flex items-center justify-center p-2">
          <span className="text-sm font-medium text-center leading-tight break-words word-break-break-word overflow-hidden w-full">
            {ingredient.name}
          </span>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1">
          {ingredient.children?.map((child) => (
            <IngredientNode
              key={child.id}
              ingredient={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              searchTerm={searchTerm}
              usedIngredientIds={usedIngredientIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface IngredientsPaletteProps {
  ingredients: Ingredient[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  usedIngredientIds: string[];
}

export default function IngredientsPalette({ ingredients, isCollapsed, onToggleCollapse, usedIngredientIds }: IngredientsPaletteProps) {
  const [activeTab, setActiveTab] = useState('Source');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['natural']));
  const [searchTerm, setSearchTerm] = useState('');
  const [secondLevelScrollIndex, setSecondLevelScrollIndex] = useState(0);

  const tabs = [
    { id: 'Source', name: 'Source', icon: 'ri-plant-line' },
    { id: 'Library', name: 'Library', icon: 'ri-book-line' },
    { id: 'Functional Group', name: 'Functional Group', icon: 'ri-test-tube-line' },
    { id: 'Existing Formula', name: 'Existing Formula', icon: 'ri-flask-line' }
  ];

  // Library ingredients data
  const libraryIngredients: Ingredient[] = [
    {
      id: 'lib-popular',
      name: 'Popular Ingredients',
      children: [
        {
          id: 'lib-vanilla',
          name: 'Vanilla',
          casNo: '121-33-5',
          concentration: 15,
          quantity: 25,
          cost: 75,
          category: 'Library',
          subcategory: 'Popular',
          description: 'Sweet, creamy vanilla for gourmand fragrances',
          isLeaf: true,
          olfactiveFamily: 'Gourmand',
          topNote: 'Sweet, Creamy',
          heartNote: 'Vanilla, Balsamic, Honey',
          baseNote: 'Warm, Comforting',
          intensity: '8/10',
          longevity: '8-12 hours'
        },
        {
          id: 'lib-ambergris',
          name: 'Ambergris (Synthetic)',
          casNo: '13171-00-1',
          concentration: 5,
          quantity: 10,
          cost: 120,
          category: 'Library',
          subcategory: 'Popular',
          description: 'Oceanic, animalic base note',
          isLeaf: true,
          olfactiveFamily: 'Animalic',
          topNote: 'Marine, Salty',
          heartNote: 'Woody, Tobacco',
          baseNote: 'Animalic, Warm',
          intensity: '7/10',
          longevity: '12-24 hours'
        },
        {
          id: 'lib-oud',
          name: 'Oud Synthetic',
          casNo: '94891-27-7',
          concentration: 3,
          quantity: 5,
          cost: 200,
          category: 'Library',
          subcategory: 'Popular',
          description: 'Rich, complex oud alternative',
          isLeaf: true,
          olfactiveFamily: 'Woody Oriental',
          topNote: 'Medicinal, Sharp',
          heartNote: 'Woody, Smoky, Leathery',
          baseNote: 'Animalic, Balsamic',
          intensity: '10/10',
          longevity: '16-24 hours'
        }
      ]
    },
    {
      id: 'lib-bases',
      name: 'Fragrance Bases',
      children: [
        {
          id: 'lib-marine-base',
          name: 'Marine Base',
          casNo: 'Blend',
          concentration: 20,
          quantity: 30,
          cost: 65,
          category: 'Library',
          subcategory: 'Bases',
          description: 'Fresh aquatic fragrance base',
          isLeaf: true,
          olfactiveFamily: 'Aquatic',
          topNote: 'Ozonic, Fresh, Watery',
          heartNote: 'Marine, Seaweed, Algae',
          baseNote: 'Mineral, Driftwood',
          intensity: '6/10',
          longevity: '4-8 hours'
        },
        {
          id: 'lib-oriental-base',
          name: 'Oriental Base',
          casNo: 'Blend',
          concentration: 25,
          quantity: 20,
          cost: 85,
          category: 'Library',
          subcategory: 'Bases',
          description: 'Warm, spicy oriental base',
          isLeaf: true,
          olfactiveFamily: 'Oriental',
          topNote: 'Spicy, Warm',
          heartNote: 'Amber, Resin, Incense',
          baseNote: 'Vanilla, Benzoin, Labdanum',
          intensity: '9/10',
          longevity: '10-16 hours'
        }
      ]
    }
  ];

  // Functional group ingredients
  const functionalGroupIngredients: Ingredient[] = [
    {
      id: 'fg-aldehydes',
      name: 'Aldehydes',
      children: [
        {
          id: 'fg-aldehyde-c8',
          name: 'Aldehyde C-8 (Octanal)',
          casNo: '124-13-0',
          concentration: 2,
          quantity: 15,
          cost: 35,
          category: 'Functional Group',
          subcategory: 'Aldehydes',
          description: 'Fresh, citrusy aldehyde with orange peel facets',
          isLeaf: true,
          olfactiveFamily: 'Aldehydic Citrus',
          topNote: 'Fresh, Citrus, Orange peel',
          heartNote: 'Waxy, Soapy',
          baseNote: 'Fatty, Slight',
          intensity: '8/10',
          longevity: '2-4 hours'
        },
        {
          id: 'fg-aldehyde-c10',
          name: 'Aldehyde C-10 (Decanal)',
          casNo: '112-31-2',
          concentration: 3,
          quantity: 18,
          cost: 40,
          category: 'Functional Group',
          subcategory: 'Aldehydes',
          description: 'Classic aldehydic note with powdery facets',
          isLeaf: true,
          olfactiveFamily: 'Aldehydic',
          topNote: 'Soapy, Clean, Metallic',
          heartNote: 'Powdery, Waxy, Orange peel',
          baseNote: 'Fatty, Slight',
          intensity: '9/10',
          longevity: '3-6 hours'
        }
      ]
    },
    {
      id: 'fg-esters',
      name: 'Esters',
      children: [
        {
          id: 'fg-benzyl-acetate',
          name: 'Benzyl Acetate',
          casNo: '140-11-4',
          concentration: 12,
          quantity: 25,
          cost: 32,
          category: 'Functional Group',
          subcategory: 'Esters',
          description: 'Fruity, floral ester with jasmine facets',
          isLeaf: true,
          olfactiveFamily: 'Floral Fruity',
          topNote: 'Fresh, Green, Pear',
          heartNote: 'Jasmine, Floral, Sweet',
          baseNote: 'Soft, Powdery',
          intensity: '7/10',
          longevity: '4-6 hours'
        },
        {
          id: 'fg-linalyl-acetate',
          name: 'Linalyl Acetate',
          casNo: '115-95-7',
          concentration: 15,
          quantity: 20,
          cost: 38,
          category: 'Functional Group',
          subcategory: 'Esters',
          description: 'Fresh, bergamot-like ester',
          isLeaf: true,
          olfactiveFamily: 'Floral Citrus',
          topNote: 'Fresh, Bergamot, Lavender',
          heartNote: 'Floral, Petitgrain',
          baseNote: 'Woody, Slight',
          intensity: '6/10',
          longevity: '3-5 hours'
        }
      ]
    },
    {
      id: 'fg-terpenes',
      name: 'Terpenes',
      children: [
        {
          id: 'fg-limonene',
          name: 'Limonene',
          casNo: '5989-27-5',
          concentration: 25,
          quantity: 50,
          cost: 28,
          category: 'Functional Group',
          subcategory: 'Terpenes',
          description: 'Fresh citrus terpene, main component of citrus oils',
          isLeaf: true,
          olfactiveFamily: 'Citrus',
          topNote: 'Fresh, Citrus, Lemon-orange',
          heartNote: 'Sweet, Fruity',
          baseNote: 'Clean, Light',
          intensity: '8/10',
          longevity: '1-3 hours'
        },
        {
          id: 'fg-pinene',
          name: 'Alpha-Pinene',
          casNo: '80-56-8',
          concentration: 8,
          quantity: 22,
          cost: 30,
          category: 'Functional Group',
          subcategory: 'Terpenes',
          description: 'Fresh, pine-like terpene',
          isLeaf: true,
          olfactiveFamily: 'Fresh Coniferous',
          topNote: 'Fresh, Pine, Turpentine',
          heartNote: 'Woody, Resinous',
          baseNote: 'Dry, Slight',
          intensity: '7/10',
          longevity: '2-4 hours'
        }
      ]
    },
    {
      id: 'fg-lactones',
      name: 'Lactones',
      children: [
        {
          id: 'fg-gamma-undecalactone',
          name: 'Gamma-Undecalactone',
          casNo: '104-67-6',
          concentration: 5,
          quantity: 12,
          cost: 55,
          category: 'Functional Group',
          subcategory: 'Lactones',
          description: 'Creamy, peach-like lactone',
          isLeaf: true,
          olfactiveFamily: 'Fruity Creamy',
          topNote: 'Fresh, Fruity, Peach',
          heartNote: 'Creamy, Milky, Coconut',
          baseNote: 'Soft, Powdery',
          intensity: '8/10',
          longevity: '6-10 hours'
        }
      ]
    }
  ];

  const getContentForTab = () => {
    if (activeTab === 'Source') {
      return ingredients;
    } else if (activeTab === 'Library') {
      return libraryIngredients;
    } else if (activeTab === 'Functional Group') {
      return functionalGroupIngredients;
    }
    return [];
  };

  const currentContent = getContentForTab();
  const visibleSecondLevelTabs = 2;
  const maxSecondLevelScrollIndex = Math.max(0, currentContent.length - visibleSecondLevelTabs);

  const scrollSecondLevelLeft = () => {
    setSecondLevelScrollIndex(Math.max(0, secondLevelScrollIndex - 1));
  };

  const scrollSecondLevelRight = () => {
    setSecondLevelScrollIndex(Math.min(maxSecondLevelScrollIndex, secondLevelScrollIndex + 1));
  };

  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col w-16">
        <div className="p-2 border-b border-gray-200">
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-4 h-4 flex items-center justify-center mx-auto">
              <i className="ri-menu-unfold-line text-gray-600" />
            </div>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center py-2 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
              title={tab.name}
            >
              <i className={tab.icon} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="p-3 lg:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Ingredients</h3>
          {/* Only show collapse button on desktop/tablet horizontal */}
          <div className="hidden lg:block">
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-menu-fold-line text-gray-600" />
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center p-2 rounded text-xs lg:text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center mb-1">
                <i className={tab.icon} />
              </div>
              <span className="leading-tight text-center">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2">
            <i className="ri-search-line text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 lg:p-4">
        {currentContent.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollSecondLevelLeft}
                disabled={secondLevelScrollIndex === 0}
                className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                  secondLevelScrollIndex === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-arrow-left-s-line text-sm" />
              </button>

              <div className="flex-1 overflow-hidden">
                <div
                  className="flex gap-2 transition-transform duration-200"
                  style={{ transform: `translateX(-${secondLevelScrollIndex * (100 / visibleSecondLevelTabs)}%)` }}
                >
                  {currentContent.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      onClick={() => toggleNode(ingredient.id)}
                      className={`flex-shrink-0 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        expandedNodes.has(ingredient.id)
                          ? 'bg-pink-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{
                        minWidth: `calc(${100 / visibleSecondLevelTabs}% - 0.5rem)`,
                      }}
                    >
                      {ingredient.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollSecondLevelRight}
                disabled={secondLevelScrollIndex >= maxSecondLevelScrollIndex}
                className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                  secondLevelScrollIndex >= maxSecondLevelScrollIndex
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className="ri-arrow-right-s-line text-sm" />
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {currentContent.map((ingredient) => (
            expandedNodes.has(ingredient.id) && ingredient.children && (
              <div key={ingredient.id} className="w-full">
                {ingredient.children.map((child) => (
                  <IngredientNode
                    key={child.id}
                    ingredient={child}
                    level={1}
                    expandedNodes={expandedNodes}
                    onToggle={toggleNode}
                    searchTerm={searchTerm}
                    usedIngredientIds={usedIngredientIds}
                  />
                ))}
              </div>
            )
          ))}
        </div>

        {activeTab === 'Existing Formula' && (
          <div className="text-center text-gray-500 py-8 text-base">
            Content for {activeTab} tab coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
