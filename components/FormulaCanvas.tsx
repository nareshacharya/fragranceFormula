
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

interface ColumnConfig {
  id: string;
  header: string;
  width: string;
  visible: boolean;
  type: 'text' | 'number' | 'currency' | 'actions';
}

interface ColumnConfigModalProps {
  columns: ColumnConfig[];
  onUpdateColumns: (columns: ColumnConfig[]) => void;
  onClose: () => void;
}

function ColumnConfigModal({ columns, onUpdateColumns, onClose }: ColumnConfigModalProps) {
  const [tempColumns, setTempColumns] = useState<ColumnConfig[]>(columns);

  const toggleColumn = (columnId: string) => {
    setTempColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col))
    );
  };

  const updateColumnHeader = (columnId: string, header: string) => {
    setTempColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, header } : col))
    );
  };

  const reorderColumn = (fromIndex: number, toIndex: number) => {
    const newColumns = [...tempColumns];
    const [moved] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, moved);
    setTempColumns(newColumns);
  };

  const handleSave = () => {
    onUpdateColumns(tempColumns);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Configure Columns</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {tempColumns.map((column, index) => (
              <div key={column.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => index > 0 && reorderColumn(index, index - 1)}
                      disabled={index === 0}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <i className="ri-arrow-up-s-line"></i>
                    </button>
                    <button
                      onClick={() => index < tempColumns.length - 1 && reorderColumn(index, index + 1)}
                      disabled={index === tempColumns.length - 1}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        index === tempColumns.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <i className="ri-arrow-down-s-line"></i>
                    </button>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={column.visible}
                      onChange={() => toggleColumn(column.id)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Visible</label>
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={column.header}
                      onChange={(e) => updateColumnHeader(column.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Column Header"
                    />
                  </div>

                  <div className="text-sm text-gray-500 w-16">{column.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
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
  columns: ColumnConfig[];
}

function DraggableIngredientRow({
  ingredient,
  sectionId,
  onRemoveIngredient,
  onUpdateIngredient,
  columns
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

  const visibleColumns = columns.filter((col) => col.visible);

  const renderCell = (column: ColumnConfig) => {
    switch (column.id) {
      case 'name':
        return (
          <div className="flex items-center space-x-2">
            <div
              {...listeners}
              {...attributes}
              className="w-4 h-4 flex items-center justify-center cursor-grab hover:text-gray-700 text-gray-400 flex-shrink-0"
            >
              <i className="ri-draggable"></i>
            </div>
            <span className="font-medium text-gray-900 text-sm truncate">{ingredient.name}</span>
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
      <tr
        ref={setNodeRef}
        style={style}
        className={`border-b border-gray-100 hover:bg-gray-50 ${isDragging ? 'opacity-50' : ''}`}
      >
        {visibleColumns.map((column) => (
          <td
            key={column.id}
            className="px-2 lg:px-3 py-3 lg:py-4"
            style={{ width: column.width }}
          >
            {renderCell(column)}
          </td>
        ))}
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
        {value}
        {type === 'concentration' ? '%' : ' ml'}
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
  columns: ColumnConfig[];
}

function DroppableSection({
  section,
  onDrop,
  onRemoveIngredient,
  onUpdateIngredient,
  columns
}: DroppableSectionProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: section.id
  });

  const totalCost = section.ingredients.reduce((sum, ingredient) => sum + (ingredient.cost || 0), 0);
  const visibleColumns = columns.filter((col) => col.visible);

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
            <table className="w-full" style={{ minWidth: '800px' }}>
              <tbody>
                {section.ingredients.map((ingredient, index) => (
                  <DraggableIngredientRow
                    key={`${section.id}-${ingredient.id}-${index}`}
                    ingredient={ingredient}
                    sectionId={section.id}
                    onRemoveIngredient={onRemoveIngredient}
                    onUpdateIngredient={onUpdateIngredient}
                    columns={columns}
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

interface ConfigurationModalProps {
  sections: FormulaSection[];
  columns: ColumnConfig[];
  onUpdateSections: (sections: { id: string; name: string; percentage: string }[]) => void;
  onUpdateColumns: (columns: ColumnConfig[]) => void;
  onClose: () => void;
}

function ConfigurationModal({
  sections,
  columns,
  onUpdateSections,
  onUpdateColumns,
  onClose
}: ConfigurationModalProps) {
  const [activeTab, setActiveTab] = useState('zones');
  const [tempSections, setTempSections] = useState<
    { id: string; name: string; percentage: string }[]
  >(
    sections.map((s) => ({ id: s.id, name: s.name, percentage: s.percentage }))
  );
  const [tempColumns, setTempColumns] = useState<ColumnConfig[]>(columns);

  const tabs = [
    { id: 'zones', name: 'Drop Zones', icon: 'ri-layout-grid-line' },
    { id: 'columns', name: 'Columns', icon: 'ri-layout-column-line' }
  ];

  const addTempSection = () => {
    const newId = `section-${Date.now()}`;
    setTempSections((prev) => [...prev, { id: newId, name: 'New Section', percentage: '10%' }]);
  };

  const removeTempSection = (index: number) => {
    if (tempSections.length > 1) {
      setTempSections((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateTempSection = (index: number, field: string, value: string) => {
    setTempSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  const toggleColumn = (columnId: string) => {
    setTempColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col))
    );
  };

  const updateColumnHeader = (columnId: string, header: string) => {
    setTempColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, header } : col))
    );
  };

  const reorderColumn = (fromIndex: number, toIndex: number) => {
    const newColumns = [...tempColumns];
    const [moved] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, moved);
    setTempColumns(newColumns);
  };

  const handleSave = () => {
    if (activeTab === 'zones') {
      onUpdateSections(tempSections);
    } else if (activeTab === 'columns') {
      onUpdateColumns(tempColumns);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Configuration Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {activeTab === 'zones' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Configure the drop zones where ingredients can be placed. Each zone represents a different part of your fragrance formula.
              </div>
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
          )}

          {activeTab === 'columns' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Configure which columns appear in the ingredient tables. Reorder columns using the arrow buttons and toggle visibility with checkboxes.
              </div>
              {tempColumns.map((column, index) => (
                <div key={column.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => index > 0 && reorderColumn(index, index - 1)}
                        disabled={index === 0}
                        className={`w-6 h-6 flex items-center justify-center rounded ${
                          index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <i className="ri-arrow-up-s-line"></i>
                      </button>
                      <button
                        onClick={() => index < tempColumns.length - 1 && reorderColumn(index, index + 1)}
                        disabled={index === tempColumns.length - 1}
                        className={`w-6 h-6 flex items-center justify-center rounded ${
                          index === tempColumns.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <i className="ri-arrow-down-s-line"></i>
                      </button>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={column.visible}
                        onChange={() => toggleColumn(column.id)}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">Visible</label>
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={column.header}
                        onChange={(e) => updateColumnHeader(column.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        placeholder="Column Header"
                      />
                    </div>

                    <div className="text-sm text-gray-500 w-16 text-center">{column.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  totalConcentration: number;
  maxConcentration?: number;
}

function ProgressBar({ totalConcentration, maxConcentration = 100 }: ProgressBarProps) {
  const percentage = Math.min((totalConcentration / maxConcentration) * 100, 100);

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
        {totalConcentration.toFixed(1)}%
      </span>
    </div>
  );
}

interface FormulaCanvasProps {
  sections: FormulaSection[];
  onAddIngredient: (sectionId: string, ingredient: Ingredient) => void;
  onRemoveIngredient: (sectionId: string, ingredientId: string) => void;
  onUpdateIngredient: (sectionId: string, ingredientId: string, updates: Partial<Ingredient>) => void;
  onConfigureSections: (sections: { id: string; name: string; percentage: string }[]) => void;
}

export default function FormulaCanvas({
  sections,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onConfigureSections
}: FormulaCanvasProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: 'name', header: 'Compound', width: '25%', visible: true, type: 'text' },
    { id: 'cas', header: 'CAS No', width: '15%', visible: true, type: 'text' },
    { id: 'concentration', header: 'Concentration', width: '12%', visible: true, type: 'number' },
    { id: 'quantity', header: 'Quantity', width: '12%', visible: true, type: 'number' },
    { id: 'cost', header: 'Cost', width: '10%', visible: true, type: 'currency' },
    { id: 'category', header: 'Category', width: '12%', visible: false, type: 'text' },
    { id: 'subcategory', header: 'Subcategory', width: '12%', visible: false, type: 'text' },
    { id: 'intensity', header: 'Intensity', width: '10%', visible: false, type: 'text' },
    { id: 'longevity', header: 'Longevity', width: '12%', visible: false, type: 'text' },
    { id: 'actions', header: 'Actions', width: '14%', visible: true, type: 'actions' }
  ]);

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

  const visibleColumns = columns.filter((col) => col.visible);

  const handleUpdateSections = (newSections: { id: string; name: string; percentage: string }[]) => {
    onConfigureSections(newSections);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-3 lg:p-6 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Formula Canvas</h2>
            <div className="flex-1 lg:flex-none lg:w-48">
              <ProgressBar totalConcentration={totalConcentration} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center px-3 lg:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm lg:text-base font-medium whitespace-nowrap hover:bg-gray-200 transition-all duration-200"
            >
              <div className="w-4 lg:w-5 h-4 lg:h-5 flex items-center justify-center mr-2">
                <i className="ri-settings-3-line"></i>
              </div>
              Configure
            </button>
            <a
              href="#"
              className="inline-flex items-center px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm lg:text-base font-medium whitespace-nowrap hover:bg-blue-700 transition-all duration-200"
            >
              <div className="w-4 lg:w-5 h-4 lg:h-5 flex items-center justify-center mr-2">
                <i className="ri-upload-line"></i>
              </div>
              Export
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-center gap-4 lg:gap-8 p-3 lg:py-4 lg:px-6 bg-gray-50 rounded-xl mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 lg:w-14 h-10 lg:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="ri-flask-line text-blue-600 text-xl lg:text-3xl" />
            </div>
            <div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{totalItems}</div>
              <div className="text-xs lg:text-sm text-gray-500">Total Ingredients</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 lg:w-14 h-10 lg:h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="ri-percent-line text-green-600 text-xl lg:text-3xl" />
            </div>
            <div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{totalConcentration.toFixed(1)}</div>
              <div className="text-xs lg:text-sm text-gray-500">Total Concentration</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 lg:w-14 h-10 lg:h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <i className="ri-scales-3-line text-orange-600 text-xl lg:text-3xl" />
            </div>
            <div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{totalQuantity}</div>
              <div className="text-xs lg:text-sm text-gray-500">Total Quantity (ml)</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 lg:w-14 h-10 lg:h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-purple-600 text-xl lg:text-3xl" />
            </div>
            <div>
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{totalCost}</div>
              <div className="text-xs lg:text-sm text-gray-500">Total Cost</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm lg:text-base" style={{ minWidth: '800px' }}>
            <thead>
              <tr className="border-b border-gray-200">
                {visibleColumns.map((column) => (
                  <th
                    key={column.id}
                    className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 bg-gray-50"
                    style={{
                      width: column.width,
                      position: column.id === 'name' ? 'sticky' : 'static',
                      left: column.id === 'name' ? 0 : 'auto',
                      zIndex: column.id === 'name' ? 10 : 'auto'
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 lg:p-6">
        <div className="space-y-4">
          {sections.map((section) => (
            <DroppableSection
              key={section.id}
              section={section}
              onDrop={(ingredient) => onAddIngredient(section.id, ingredient)}
              onRemoveIngredient={(ingredientId) => onRemoveIngredient(section.id, ingredientId)}
              onUpdateIngredient={(ingredientId, updates) => onUpdateIngredient(section.id, ingredientId, updates)}
              columns={columns}
            />
          ))}
        </div>
      </div>

      {showConfigModal && (
        <ConfigurationModal
          sections={sections}
          columns={columns}
          onUpdateSections={handleUpdateSections}
          onUpdateColumns={setColumns}
          onClose={() => setShowConfigModal(false)}
        />
      )}
    </div>
  );
}
