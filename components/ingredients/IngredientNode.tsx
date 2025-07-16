'use client';

import { Ingredient } from '@/lib/ingredientsData';
import DraggableIngredient from './DraggableIngredient';

interface IngredientNodeProps {
  ingredient: Ingredient;
  level: number;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  searchTerm: string;
  usedIngredientIds: string[];
}

export default function IngredientNode({ ingredient, level, expandedNodes, onToggle, searchTerm, usedIngredientIds }: IngredientNodeProps) {
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
      <div style={{ paddingLeft: paddingLeft + 4 }} className="py-1">
        <DraggableIngredient ingredient={ingredient} isDisabled={isUsed} />
      </div>
    );
  }

  // Level 1 - Main categories (Floral, Citrus, etc.)
  if (level === 1) {
    return (
      <div>
        <div
          className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={handleClick}
        >
          <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
            <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
          </div>
          <div className="w-20 h-20 mr-3 flex-shrink-0 relative rounded border-2 bg-blue-100 border-blue-300 text-blue-800 flex items-center justify-center">
            <span className="text-base font-semibold text-center leading-tight px-2 break-words overflow-hidden">
              {ingredient.name}
            </span>
          </div>
          <span className="text-gray-700 text-base font-medium flex-1 ml-2 break-words">
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
      <div>
        <div
          className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={handleClick}
        >
          <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
            <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
          </div>
          <div className="w-16 h-16 mr-3 flex-shrink-0 relative rounded border bg-green-100 border-green-300 text-green-800 flex items-center justify-center">
            <span className="text-sm font-medium text-center leading-tight px-2 break-words overflow-hidden">
              {ingredient.name}
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium flex-1 ml-2 break-words">
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
    <div>
      <div
        className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer rounded w-full"
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleClick}
      >
        <div className="w-3 h-3 flex items-center justify-center mr-1 flex-shrink-0">
          <i className={`ri-arrow-${isExpanded ? 'down' : 'right'}-s-line text-gray-600 text-sm`} />
        </div>
        <div className="w-full h-16 relative rounded border bg-purple-100 border-purple-300 text-purple-800 flex items-center justify-center p-2">
          <span className="text-sm font-medium text-center leading-tight break-words overflow-hidden w-full">
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