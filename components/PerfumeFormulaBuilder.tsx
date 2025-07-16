
'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import IngredientsPalette from './IngredientsPalette';
import FormulaCanvas from './FormulaCanvas';
import { Ingredient } from '@/lib/ingredientsData';

export default function PerfumeFormulaBuilder() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);

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
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const isIngredientInFormula = (ingredientId: string): boolean => {
    return ingredients.some(ingredient => ingredient.id === ingredientId);
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

    if (over && over.id !== 'formula-canvas' && ingredients.some(ing => ing.id === active.id)) {
      return;
    }

    if (over && over.id === 'formula-canvas' && active.data.current?.ingredient) {
      const ingredient = active.data.current.ingredient as Ingredient;
      
      if (!isIngredientInFormula(ingredient.id)) {
        const newIngredient = {
          ...ingredient,
          concentration: 5,
          quantity: 10,
          cost: Math.round(Math.random() * 50 + 10)
        };
        addIngredient(newIngredient);
      }
    }
  };

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const removeIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
  };

  const updateIngredient = (ingredientId: string, updates: Partial<Ingredient>) => {
    setIngredients(prev => prev.map(ing =>
      ing.id === ingredientId ? { ...ing, ...updates } : ing
    ));
  };

  const handleUpdateIngredients = (newIngredients: Ingredient[]) => {
    setIngredients(newIngredients);
  };

  const dragOverlayContent = activeIngredient ? (
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
  ) : null;

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
            usedIngredientIds={ingredients.map(i => i.id)}
          />
        </div>

        <div className="flex-1 order-2">
          <FormulaCanvas
            ingredients={ingredients}
            onAddIngredient={addIngredient}
            onRemoveIngredient={removeIngredient}
            onUpdateIngredient={updateIngredient}
            onUpdateIngredients={handleUpdateIngredients}
          />
        </div>
      </div>

      <DragOverlay>
        {dragOverlayContent}
      </DragOverlay>
    </DndContext>
  );
}
