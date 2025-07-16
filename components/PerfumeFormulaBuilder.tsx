
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

  const handleConfigureSections = (newSections: {id: string, name: string, percentage: string}[]) => {
    const updatedSections: FormulaSection[] = newSections.map(temp => {
      const existingSection = sections.find(s => s.id === temp.id);
      return {
        id: temp.id,
        name: temp.name,
        percentage: temp.percentage,
        ingredients: existingSection?.ingredients || []
      };
    });
    setSections(updatedSections);
  };

  const handleUpdateSections = (newSections: FormulaSection[]) => {
    setSections(newSections);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50 p-2 lg:p-4 gap-2">
        <div className={`${isPaletteCollapsed ? 'w-16' : 'w-full lg:w-80 xl:w-96'} ${isPaletteCollapsed ? 'h-auto' : 'h-80 lg:h-auto'} transition-all duration-300 flex-shrink-0 order-1`}>
          <IngredientsPalette
            ingredients={ingredientsData}
            isCollapsed={isPaletteCollapsed}
            onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
            usedIngredientIds={sections.flatMap(s => s.ingredients.map(i => i.id))}
          />
        </div>

        <div className="flex-1 order-2">
          <FormulaCanvas
            sections={sections}
            onAddIngredient={addIngredientToSection}
            onRemoveIngredient={removeIngredientFromSection}
            onUpdateIngredient={updateIngredientInSection}
            onConfigureSections={handleConfigureSections}
            onUpdateSections={handleUpdateSections}
          />
        </div>
      </div>

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
