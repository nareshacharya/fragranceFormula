
'use client';

import { useState } from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { Ingredient, FormulaSection } from './lib/ingredientsData';

interface IngredientDetailPopupProps {
  ingredient: Ingredient;
  onClose: () => void;
}

function IngredientDetailPopup({ ingredient, onClose }: IngredientDetailPopupProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      id: 'basic',
      title: 'Basic Information',
      icon: 'ri-information-line',
      content: [
        { label: 'Name', value: ingredient.name },
        { label: 'CAS Number', value: ingredient.casNo || 'N/A' },
        { label: 'Category', value: ingredient.category || 'N/A' },
        { label: 'Subcategory', value: ingredient.subcategory || 'N/A' },
        { label: 'Description', value: ingredient.description || 'N/A' }
      ]
    },
    {
      id: 'olfactive',
      title: 'Olfactive Profile',
      icon: 'ri-nose-line',
      content: [
        { label: 'Olfactive Family', value: ingredient.olfactiveFamily || 'Floral' },
        { label: 'Top Note', value: ingredient.topNote || 'Fresh, Green' },
        { label: 'Heart Note', value: ingredient.heartNote || 'Floral, Sweet' },
        { label: 'Base Note', value: ingredient.baseNote || 'Woody, Musky' },
        { label: 'Intensity', value: ingredient.intensity || '7/10' },
        { label: 'Longevity', value: ingredient.longevity || '6-8 hours' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Properties',
      icon: 'ri-flask-line',
      content: [
        { label: 'Molecular Weight', value: ingredient.molecularWeight || '154.25 g/mol' },
        { label: 'Boiling Point', value: ingredient.boilingPoint || '215°C' },
        { label: 'Flash Point', value: ingredient.flashPoint || '93°C' },
        { label: 'Solubility', value: ingredient.solubility || 'Ethanol, Oil' },
        { label: 'Stability', value: ingredient.stability || 'Stable under normal conditions' },
        { label: 'pH', value: ingredient.pH || '6.5-7.5' }
      ]
    },
    {
      id: 'regulations',
      title: 'Regulations & Certifications',
      icon: 'ri-shield-check-line',
      content: [
        { label: 'IFRA Category', value: ingredient.ifraCategory || 'Category 1-4' },
        { label: 'IFRA Restriction', value: ingredient.ifraRestriction || '0.1% max' },
        { label: 'EU Cosmetic Regulation', value: ingredient.euRegulation || 'Compliant' },
        { label: 'FDA Status', value: ingredient.fdaStatus || 'GRAS' },
        { label: 'Halal Certified', value: ingredient.halalCertified || 'Yes' },
        { label: 'Vegan', value: ingredient.vegan || 'Yes' }
      ]
    },
    {
      id: 'usage',
      title: 'Usage & Recommendations',
      icon: 'ri-lightbulb-line',
      content: [
        { label: 'Recommended Usage', value: ingredient.recommendedUsage || '0.5-2.0%' },
        { label: 'Blends Well With', value: ingredient.blendsWellWith || 'Rose, Jasmine, Sandalwood' },
        { label: 'Application', value: ingredient.application || 'Fine Fragrance, Personal Care' },
        { label: 'Storage', value: ingredient.storage || 'Cool, dry place, away from light' },
        { label: 'Shelf Life', value: ingredient.shelfLife || '24 months' }
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: 'ri-leaf-line',
      content: [
        { label: 'Origin', value: ingredient.origin || 'France' },
        { label: 'Extraction Method', value: ingredient.extractionMethod || 'Steam Distillation' },
        { label: 'Sustainability Score', value: ingredient.sustainabilityScore || '8/10' },
        { label: 'Carbon Footprint', value: ingredient.carbonFootprint || 'Low' },
        { label: 'Biodegradability', value: ingredient.biodegradability || 'Readily biodegradable' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-flask-fill text-blue-600"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{ingredient.name}</h2>
              <p className="text-sm text-gray-500">Complete Ingredient Profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="p-4 max-h-[calc(90vh-100px)] overflow-y-auto">
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors ${
                    expandedSections.has(section.id) ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${section.icon} text-gray-600`}></i>
                    </div>
                    <span className="font-medium text-gray-900">{section.title}</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i
                      className={`ri-arrow-${expandedSections.has(section.id) ? 'up' : 'down'}-s-line text-gray-400`}
                    ></i>
                  </div>
                </button>

                {expandedSections.has(section.id) && (
                  <div className="px-3 pb-3">
                    <div className="grid grid-cols-2 gap-3">
                      {section.content.map((item, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-gray-100">
                          <div className="text-xs font-medium text-gray-500 mb-1">{item.label}</div>
                          <div className="text-sm text-gray-900">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DraggableIngredientRowProps {
  ingredient: Ingredient;
  sectionId: string;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (ingredientId: string, updates: Partial<Ingredient>) => void;
}

function DraggableIngredientRow({
  ingredient,
  sectionId,
  onRemoveIngredient,
  onUpdateIngredient
}: DraggableIngredientRowProps) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${sectionId}-${ingredient.id}`,
    data: { ingredient, sectionId }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'relative' as const,
        zIndex: 1000
      }
    : undefined;

  return (
    <>
      <tr
        ref={setNodeRef}
        style={style}
        className={`border-b border-gray-100 hover:bg-gray-50 ${isDragging ? 'opacity-50' : ''}`}
      >
        <td className="px-3 py-2 w-[30%]">
          <div className="flex items-center space-x-2">
            <div
              {...listeners}
              {...attributes}
              className="w-4 h-4 flex items-center justify-center cursor-grab hover:text-gray-700 text-gray-400"
            >
              <i className="ri-draggable"></i>
            </div>
            <span className="font-medium text-gray-900 text-sm">{ingredient.name}</span>
          </div>
        </td>
        <td className="px-3 py-2 text-xs text-gray-600 w-[20%]">
          {ingredient.casNo}
        </td>
        <td className="px-3 py-2 w-[15%]">
          <InlineEditCell
            value={ingredient.concentration || 0}
            type="concentration"
            onUpdate={(value) => onUpdateIngredient(ingredient.id, { concentration: value })}
          />
        </td>
        <td className="px-3 py-2 w-[15%]">
          <InlineEditCell
            value={ingredient.quantity || 0}
            type="quantity"
            onUpdate={(value) => onUpdateIngredient(ingredient.id, { quantity: value })}
          />
        </td>
        <td className="px-3 py-2 text-sm font-medium w-[10%]">
          ${ingredient.cost}
        </td>
        <td className="px-3 py-2 w-[10%]">
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
        </td>
      </tr>

      {showDetailPopup && (
        <IngredientDetailPopup
          ingredient={ingredient}
          onClose={() => setShowDetailPopup(false)}
        />
      )}
    </>
  );
}

interface InlineEditCellProps {
  value: number;
  type: 'concentration' | 'quantity';
  onUpdate: (value: number) => void;
}

function InlineEditCell({ value, type, onUpdate }: InlineEditCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-1">
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          onKeyPress={handleKeyPress}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
          min="0"
          max={type === 'concentration' ? '100' : undefined}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="w-5 h-5 flex items-center justify-center text-green-600 hover:bg-green-50 rounded"
        >
          <i className="ri-check-line text-xs"></i>
        </button>
        <button
          onClick={handleCancel}
          className="w-5 h-5 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded"
        >
          <i className="ri-close-line text-xs"></i>
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
      onClick={() => setIsEditing(true)}
    >
      <span className="text-sm">
        {value}{type === 'concentration' ? '%' : ' ml'}
      </span>
      <i className="ri-edit-line text-xs text-gray-400"></i>
    </div>
  );
}

interface DroppableSectionProps {
  section: FormulaSection;
  onDrop: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (ingredientId: string, updates: Partial<Ingredient>) => void;
}

function DroppableSection({
  section,
  onDrop,
  onRemoveIngredient,
  onUpdateIngredient
}: DroppableSectionProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: section.id
  });

  const totalCost = section.ingredients.reduce((sum, ingredient) => sum + (ingredient.cost || 0), 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{section.name}</h3>
            <p className="text-sm text-gray-500">{section.percentage}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Items: {section.ingredients.length}</div>
            <div className="text-sm font-medium">${totalCost}</div>
          </div>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`transition-colors ${
          isOver ? 'bg-purple-50 border-purple-200' : ''
        }`}
      >
        {section.ingredients.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg m-3">
            Drop ingredients here
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {section.ingredients.map((ingredient, index) => (
                  <DraggableIngredientRow
                    key={`${section.id}-${ingredient.id}-${index}`}
                    ingredient={ingredient}
                    sectionId={section.id}
                    onRemoveIngredient={onRemoveIngredient}
                    onUpdateIngredient={onUpdateIngredient}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface FormulaCanvasProps {
  sections: FormulaSection[];
  onAddIngredient: (sectionId: string, ingredient: Ingredient) => void;
  onRemoveIngredient: (sectionId: string, ingredientId: string) => void;
  onUpdateIngredient: (sectionId: string, ingredientId: string, updates: Partial<Ingredient>) => void;
  onConfigureSections: () => void;
}

export default function FormulaCanvas({
  sections,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onConfigureSections
}: FormulaCanvasProps) {
  const totalItems = sections.reduce((sum, section) => sum + section.ingredients.length, 0);
  const totalCost = sections.reduce(
    (sum, section) =>
      sum + section.ingredients.reduce((sectionSum, ingredient) => sectionSum + (ingredient.cost || 0), 0),
    0
  );
  const totalConcentration = sections.reduce(
    (sum, section) =>
      sum + section.ingredients.reduce((sectionSum, ingredient) => sectionSum + (ingredient.concentration || 0), 0),
    0
  );
  const totalQuantity = sections.reduce(
    (sum, section) =>
      sum + section.ingredients.reduce((sectionSum, ingredient) => sectionSum + (ingredient.quantity || 0), 0),
    0
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Formula Canvas</h2>
          <div className="flex gap-2">
            <button
              onClick={onConfigureSections}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-base font-medium whitespace-nowrap hover:bg-gray-200 transition-all duration-200"
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-settings-3-line text-lg"></i>
              </div>
              Configure Zones
            </button>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-base font-medium whitespace-nowrap hover:bg-blue-700 transition-all duration-200"
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-upload-line text-lg"></i>
              </div>
              Export
            </a>
          </div>
        </div>

        {/* Total Summary - Compact horizontal layout */}
        <div className="flex items-center justify-center gap-8 py-4 px-6 bg-gray-50 rounded-xl mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="ri-flask-line text-blue-600 text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
              <div className="text-sm text-gray-500">Total Ingredients</div>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-percent-line text-green-600 text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalConcentration.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Total Concentration</div>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <i className="ri-scales-3-line text-orange-600 text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalQuantity}</div>
              <div className="text-sm text-gray-500">Total Quantity (ml)</div>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-purple-600 text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalCost}</div>
              <div className="text-sm text-gray-500">Total Cost</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[30%]">Compound</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[20%]">CAS No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[15%]">Concentration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[15%]">Quantity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[10%]">Cost</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 w-[10%]">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <DroppableSection
              key={section.id}
              section={section}
              onDrop={(ingredient) => onAddIngredient(section.id, ingredient)}
              onRemoveIngredient={(ingredientId) => onRemoveIngredient(section.id, ingredientId)}
              onUpdateIngredient={(ingredientId, updates) => onUpdateIngredient(section.id, ingredientId, updates)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
