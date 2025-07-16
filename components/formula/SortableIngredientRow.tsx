'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Ingredient } from '@/lib/ingredientsData';
import IngredientDetailPopup from './IngredientDetailPopup';
import InlineEditCell from './InlineEditCell';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface ColumnConfig {
  id: string;
  header: string;
  width: string;
  visible: boolean;
  type: 'text' | 'number' | 'currency' | 'actions';
}

interface SortableIngredientRowProps {
  ingredient: Ingredient;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (ingredientId: string, updates: Partial<Ingredient>) => void;
  columns: ColumnConfig[];
  validationResult?: ValidationResult;
  isLast?: boolean;
}

export default function SortableIngredientRow({
  ingredient,
  onRemoveIngredient,
  onUpdateIngredient,
  columns,
  validationResult,
  isLast
}: SortableIngredientRowProps) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: ingredient.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto'
  };

  const visibleColumns = columns.filter((col) => col.visible);
  const hasErrors = validationResult && !validationResult.isValid;

  const renderCell = (column: ColumnConfig) => {
    switch (column.id) {
      case 'name':
        return (
          <div className="flex items-center space-x-2">
            <div {...listeners} {...attributes} className="w-4 h-4 flex items-center justify-center cursor-grab hover:text-gray-700 text-gray-400 flex-shrink-0">
              <i className="ri-draggable"></i>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm truncate">{ingredient.name}</span>
              {hasErrors && (
                <i
                  className="ri-error-warning-line text-red-500 text-sm"
                  title={validationResult?.errors.join(', ')}
                ></i>
              )}
            </div>
          </div>
        );
      case 'cas':
        return <span className="text-xs text-gray-600 truncate">{ingredient.casNo || 'N/A'}</span>;
      case 'concentration':
        return (
          <InlineEditCell
            value={ingredient.concentration || 0}
            type="concentration"
            onUpdate={(value) => onUpdateIngredient(ingredient.id, { concentration: value })}
            hasError={hasErrors}
          />
        );
      case 'quantity':
        return (
          <InlineEditCell
            value={ingredient.quantity || 0}
            type="quantity"
            onUpdate={(value) => onUpdateIngredient(ingredient.id, { quantity: value })}
          />
        );
      case 'cost':
        return <span className="text-sm font-medium">${ingredient.cost || 0}</span>;
      case 'category':
        return <span className="text-xs text-gray-600 truncate">{ingredient.category || 'N/A'}</span>;
      case 'subcategory':
        return <span className="text-xs text-gray-600 truncate">{ingredient.subcategory || 'N/A'}</span>;
      case 'intensity':
        return <span className="text-xs text-gray-600 truncate">{ingredient.intensity || 'N/A'}</span>;
      case 'longevity':
        return <span className="text-xs text-gray-600 truncate">{ingredient.longevity || 'N/A'}</span>;
      case 'ifra':
        return <span className="text-xs text-gray-600 truncate">{ingredient.ifraCategory || 'N/A'}</span>;
      case 'allergen':
        return (
          <span
            className={`text-xs truncate ${ingredient.allergenicity ? 'text-red-600' : 'text-green-600'}`}
          >
            {ingredient.allergenicity ? 'Yes' : 'No'}
          </span>
        );
      case 'actions':
        return (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowDetailPopup(true)}
              className="w-6 h-6 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded"
              title="View Details"
            >
              <i className="ri-information-line"></i>
            </button>
            <button
              onClick={() => onRemoveIngredient(ingredient.id)}
              className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded"
              title="Remove"
            >
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        );
      default:
        return <span className="text-sm text-gray-600">-</span>;
    }
  };

  return (
    <>
      <tr ref={setNodeRef} style={style} className={`border-b border-gray-100 hover:bg-gray-50 ${isDragging ? 'opacity-50' : ''} ${hasErrors ? 'bg-red-50' : ''}`}>
        {visibleColumns.map((column) => (
          <td key={column.id} className="px-2 lg:px-3 py-3 lg:py-4" style={{ width: column.width }}>
            {renderCell(column)}
          </td>
        ))}
      </tr>

      {showDetailPopup && (
        <IngredientDetailPopup ingredient={ingredient} onClose={() => setShowDetailPopup(false)} />
      )}
    </>
  );
}