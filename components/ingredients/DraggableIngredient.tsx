'use client';

import { useDraggable } from '@dnd-kit/core';
import { Ingredient } from '@/lib/ingredientsData';

interface DraggableIngredientProps {
  ingredient: Ingredient;
  isDisabled?: boolean;
}

export default function DraggableIngredient({ ingredient, isDisabled = false }: DraggableIngredientProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: ingredient.id,
    data: { ingredient },
    disabled: isDisabled
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
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