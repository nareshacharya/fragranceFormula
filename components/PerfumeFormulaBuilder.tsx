
'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import IngredientsPalette from './IngredientsPalette';
import FormulaCanvas from './FormulaCanvas';
import { Ingredient, FormulaSection } from '@/lib/ingredientsData';

const defaultSections: FormulaSection[] = [
  {
    id: 'top-notes',
    name: 'Top Notes',
    percentage: '10-15%',
    ingredients: []
  },
  {
    id: 'middle-notes',
    name: 'Middle Notes',
    percentage: '30-50%',
    ingredients: []
  },
  {
    id: 'base-notes',
    name: 'Base Notes',
    percentage: '20-30%',
    ingredients: []
  }
];

export default function PerfumeFormulaBuilder() {
  const [sections, setSections] = useState<FormulaSection[]>(defaultSections);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [showSectionConfig, setShowSectionConfig] = useState(false);
  const [tempSections, setTempSections] = useState<{id: string, name: string, percentage: string}[]>([]);

  // Load ingredients from external JSON source
  useEffect(() => {
    const loadIngredientsData = async () => {
      try {
        const enhancedIngredients = await import('@/lib/ingredientsData');
        setIngredientsData(enhancedIngredients.ingredientsData);
      } catch (error) {
        console.error('Failed to load ingredients data:', error);
        const fallbackData = await import('@/lib/ingredientsData');
        setIngredientsData(fallbackData.ingredientsData);
      }
    };

    loadIngredientsData();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Check if ingredient already exists in any section
  const isIngredientInSections = (ingredientId: string): boolean => {
    return sections.some(section => 
      section.ingredients.some(ingredient => ingredient.id === ingredientId)
    );
  };

  const handleDragStart = (event: any) => {
    const ingredient = event.active.data.current?.ingredient;
    if (ingredient) {
      setActiveIngredient(ingredient);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIngredient(null);

    if (over && active.data.current?.ingredient) {
      const ingredient = active.data.current.ingredient as Ingredient;
      const overId = over.id as string;
      const sourceSection = active.data.current?.sectionId;

      if (sourceSection && sourceSection !== overId) {
        // Moving between sections
        moveIngredientBetweenSections(sourceSection, overId, ingredient.id);
      } else if (!sourceSection) {
        // Adding new ingredient from palette - only if not already in sections
        if (!isIngredientInSections(ingredient.id)) {
          const newIngredient = {
            ...ingredient,
            concentration: 5,
            quantity: 10,
            cost: Math.round(Math.random() * 50 + 10)
          };
          addIngredientToSection(overId, newIngredient);
        }
      }
    }
  };

  const addIngredientToSection = (sectionId: string, ingredient: Ingredient) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, ingredients: [...section.ingredients, ingredient] }
        : section
    ));
  };

  const removeIngredientFromSection = (sectionId: string, ingredientId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, ingredients: section.ingredients.filter(ing => ing.id !== ingredientId) }
        : section
    ));
  };

  const moveIngredientBetweenSections = (fromSectionId: string, toSectionId: string, ingredientId: string) => {
    setSections(prev => {
      const fromSection = prev.find(s => s.id === fromSectionId);
      const ingredient = fromSection?.ingredients.find(i => i.id === ingredientId);

      if (!ingredient) return prev;

      return prev.map(section => {
        if (section.id === fromSectionId) {
          return { ...section, ingredients: section.ingredients.filter(ing => ing.id !== ingredientId) };
        } else if (section.id === toSectionId) {
          return { ...section, ingredients: [...section.ingredients, ingredient] };
        }
        return section;
      });
    });
  };

  const updateIngredientInSection = (sectionId: string, ingredientId: string, updates: Partial<Ingredient>) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
          ...section,
          ingredients: section.ingredients.map(ing =>
            ing.id === ingredientId ? { ...ing, ...updates } : ing
          )
        }
        : section
    ));
  };

  const openSectionConfig = () => {
    setTempSections(sections.map(s => ({ id: s.id, name: s.name, percentage: s.percentage })));
    setShowSectionConfig(true);
  };

  const addTempSection = () => {
    const newId = `section-${Date.now()}`;
    setTempSections(prev => [...prev, { id: newId, name: 'New Section', percentage: '10%' }]);
  };

  const removeTempSection = (index: number) => {
    if (tempSections.length > 1) {
      setTempSections(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateTempSection = (index: number, field: string, value: string) => {
    setTempSections(prev => prev.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    ));
  };

  const saveSectionConfig = () => {
    const newSections: FormulaSection[] = tempSections.map(temp => {
      const existingSection = sections.find(s => s.id === temp.id);
      return {
        id: temp.id,
        name: temp.name,
        percentage: temp.percentage,
        ingredients: existingSection?.ingredients || []
      };
    });
    setSections(newSections);
    setShowSectionConfig(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-gray-50 p-4 gap-2">
        <div className={`${isPaletteCollapsed ? 'w-16' : 'w-96'} transition-all duration-300 flex-shrink-0`}>
          <IngredientsPalette
            ingredients={ingredientsData}
            isCollapsed={isPaletteCollapsed}
            onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
            usedIngredientIds={sections.flatMap(s => s.ingredients.map(i => i.id))}
          />
        </div>

        <div className="flex-1">
          <FormulaCanvas
            sections={sections}
            onAddIngredient={addIngredientToSection}
            onRemoveIngredient={removeIngredientFromSection}
            onUpdateIngredient={updateIngredientInSection}
            onConfigureSections={openSectionConfig}
          />
        </div>
      </div>

      {/* Section Configuration Modal */}
      {showSectionConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Configure Drop Zones</h2>
              <button
                onClick={() => setShowSectionConfig(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {tempSections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                        <input
                          type="text"
                          value={section.name}
                          onChange={(e) => updateTempSection(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="w-32">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                        <input
                          type="text"
                          value={section.percentage}
                          onChange={(e) => updateTempSection(index, 'percentage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeTempSection(index)}
                        disabled={tempSections.length <= 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          tempSections.length <= 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addTempSection}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add New Drop Zone
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setShowSectionConfig(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSectionConfig}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <DragOverlay>
        {activeIngredient ? (
          <div className="bg-white border-2 border-blue-400 rounded-lg p-3 shadow-lg opacity-90 pointer-events-none relative z-50">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-flask-fill text-blue-600"></i>
              </div>
              <div className="text-base font-medium text-gray-900">{activeIngredient.name}</div>
            </div>
            {activeIngredient.casNo && (
              <div className="text-sm text-gray-500 mt-1">CAS: {activeIngredient.casNo}</div>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
