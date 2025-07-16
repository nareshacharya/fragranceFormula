
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  useDroppable, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  KeyboardSensor 
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Ingredient } from '@/lib/ingredientsData';

// Import new smaller components
import CupProgress from './formula/CupProgress';
import ValidationPanel from './formula/ValidationPanel';
import TrialTab from './formula/TrialTab';
import DeleteConfirmationModal from './formula/DeleteConfirmationModal';
import ConfigurationModal from './formula/ConfigurationModal';
import SortableIngredientRow from './formula/SortableIngredientRow';

interface ColumnConfig {
  id: string;
  header: string;
  width: string;
  visible: boolean;
  type: 'text' | 'number' | 'currency' | 'actions';
}

interface FormulaConfig {
  maxConcentration: number;
  regulations: {
    ifraCategories: Record<string, { maxConcentration: number; description: string }>;
    allergens: {
      required: string[];
      declarationThreshold: number;
    };
  };
  validations: {
    concentrationLimits: {
      individual: { min: number; max: number };
      total: { min: number; max: number };
    };
    quantityLimits: {
      individual: { min: number; max: number };
    };
  };
}

interface Trial {
  id: string;
  name: string;
  ingredients: Ingredient[];
  createdAt: Date;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface FormulaCanvasProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (ingredientId: string, updates: Partial<Ingredient>) => void;
  onUpdateIngredients: (ingredients: Ingredient[]) => void;
}

export default function FormulaCanvas({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onUpdateIngredients
}: FormulaCanvasProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [trialCounter, setTrialCounter] = useState(1);
  const [trials, setTrials] = useState<Trial[]>([
    {
      id: 'trial-1',
      name: 'Trial 1',
      ingredients: [],
      createdAt: new Date()
    }
  ]);
  const [activeTrialId, setActiveTrialId] = useState('trial-1');
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [formulaConfig, setFormulaConfig] = useState<FormulaConfig | null>(null);
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [trialsScrollIndex, setTrialsScrollIndex] = useState(0);

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: 'formula-canvas'
  });

  const activeTrial = useMemo(() => trials.find((t) => t.id === activeTrialId), [trials, activeTrialId]);
  const currentIngredients = useMemo(() => activeTrial?.ingredients || [], [activeTrial?.ingredients]);

  useEffect(() => {
    let isMounted = true;

    const loadConfig = async () => {
      try {
        const [columnConfig, formulaConfigData] = await Promise.all([
          import('../lib/columnConfig.json'),
          import('../lib/formulaConfig.json')
        ]);

        if (isMounted) {
          setColumns(columnConfig.defaultColumns);
          setFormulaConfig(formulaConfigData);
        }
      } catch (error) {
        console.error('Failed to load configuration:', error);
        if (isMounted) {
          setColumns([
            { id: 'name', header: 'Compound', width: '25%', visible: true, type: 'text' },
            { id: 'cas', header: 'CAS No', width: '12%', visible: true, type: 'text' },
            { id: 'concentration', header: 'Concentration (%)', width: '12%', visible: true, type: 'number' },
            { id: 'quantity', header: 'Quantity (ml)', width: '12%', visible: true, type: 'number' },
            { id: 'cost', header: 'Cost ($)', width: '10%', visible: true, type: 'currency' },
            { id: 'actions', header: 'Actions', width: '10%', visible: true, type: 'actions' }
          ]);
          setFormulaConfig({
            maxConcentration: 100,
            regulations: { ifraCategories: {}, allergens: { required: [], declarationThreshold: 0.001 } },
            validations: {
              concentrationLimits: { individual: { min: 0, max: 50 }, total: { min: 0, max: 100 } },
              quantityLimits: { individual: { min: 0, max: 1000 } }
            }
          });
        }
      }

      return () => {
        isMounted = false;
      };
    };

    loadConfig();
  }, []);

  const validateIngredients = useCallback((ingredients: Ingredient[], config: FormulaConfig | null) => {
    if (!config) return {};

    const results: Record<string, ValidationResult> = {};

    ingredients.forEach((ingredient) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      if (ingredient.concentration && ingredient.concentration > config.validations.concentrationLimits.individual.max) {
        errors.push(`Concentration ${ingredient.concentration}% exceeds maximum ${config.validations.concentrationLimits.individual.max}%`);
      }

      if (ingredient.concentration && ingredient.concentration < config.validations.concentrationLimits.individual.min) {
        warnings.push(`Concentration ${ingredient.concentration}% is below recommended minimum ${config.validations.concentrationLimits.individual.min}%`);
      }

      if (ingredient.quantity && ingredient.quantity > config.validations.quantityLimits.individual.max) {
        warnings.push(`Quantity ${ingredient.quantity}ml is above recommended maximum ${config.validations.quantityLimits.individual.max}ml`);
      }

      if (ingredient.ifraCategory && config.regulations.ifraCategories[ingredient.ifraCategory]) {
        const ifraLimit = config.regulations.ifraCategories[ingredient.ifraCategory].maxConcentration;
        if (ingredient.concentration && ingredient.concentration > ifraLimit) {
          errors.push(`IFRA Category ${ingredient.ifraCategory} limits this ingredient to ${ifraLimit}%`);
        }
      }

      results[ingredient.id] = {
        isValid: errors.length === 0,
        errors,
        warnings
      };
    });

    return results;
  }, []);

  useEffect(() => {
    const results = validateIngredients(currentIngredients, formulaConfig);
    setValidationResults(results);
  }, [currentIngredients, formulaConfig, validateIngredients]);

  const handleIngredientUpdate = useCallback((ingredientId: string, updates: Partial<Ingredient>) => {
    const updatedIngredients = currentIngredients.map((ing) => (ing.id === ingredientId ? { ...ing, ...updates } : ing));

    onUpdateIngredient(ingredientId, updates);

    setTrials((prevTrials) =>
      prevTrials.map((trial) =>
        trial.id === activeTrialId
          ? { ...trial, ingredients: updatedIngredients }
          : trial
      )
    );
  }, [currentIngredients, onUpdateIngredient, activeTrialId, setTrials]);

  const handleIngredientRemove = useCallback((ingredientId: string) => {
    const updatedIngredients = currentIngredients.filter((ing) => ing.id !== ingredientId);

    onRemoveIngredient(ingredientId);

    setTrials((prevTrials) =>
      prevTrials.map((trial) =>
        trial.id === activeTrialId
          ? { ...trial, ingredients: updatedIngredients }
          : trial
      )
    );
  }, [currentIngredients, onRemoveIngredient, activeTrialId, setTrials]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Trials Tab Bar with Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Left scroll arrow */}
            <button
              onClick={() => setTrialsScrollIndex(Math.max(0, trialsScrollIndex - 1))}
              disabled={trialsScrollIndex === 0}
              className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                trialsScrollIndex === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-arrow-left-s-line text-sm" />
            </button>

            {/* Trials tabs container */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex items-center gap-1 transition-transform duration-200"
                style={{
                  transform: `translateX(-${trialsScrollIndex * (100 / 4)}%)`
                }}
              >
                {trials
                  .slice(trialsScrollIndex, trialsScrollIndex + 4)
                  .map((trial) => (
                    <div
                      key={trial.id}
                      className="flex-shrink-0"
                      style={{ minWidth: `calc(${100 / 4}% - 0.25rem)` }}
                    >
                      <TrialTab
                        key={trial.id}
                        trial={trial}
                        isActive={trial.id === activeTrialId}
                        onClick={() => setActiveTrialId(trial.id)}
                        onDelete={() => setShowDeleteModal(trial.id)}
                        onRename={(newName) => {
                          setTrials(
                            trials.map((t) => (t.id === trial.id ? { ...t, name: newName } : t))
                          );
                        }}
                        canDelete={trials.length > 1}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Right scroll arrow */}
            <button
              onClick={() => setTrialsScrollIndex(Math.min(trials.length - 4, trialsScrollIndex + 1))}
              disabled={trialsScrollIndex >= trials.length - 4}
              className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                trialsScrollIndex >= trials.length - 4
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="ri-arrow-right-s-line text-sm" />
            </button>

            {/* Add trial button */}
            <button
              onClick={() => {
                const newTrialNumber = trialCounter + 1;
                const newTrial: Trial = {
                  id: `trial-${newTrialNumber}`,
                  name: `Trial ${newTrialNumber}`,
                  ingredients: [],
                  createdAt: new Date()
                };

                setTrialCounter(newTrialNumber);
                setTrials([...trials, newTrial]);
                setActiveTrialId(newTrial.id);
                onUpdateIngredients([]);
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ml-2"
            >
              <i className="ri-add-line" />
              Add Trial
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Content */}
      <div className="p-3 lg:p-4 bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Formula Builder</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              title="Configure Table"
            >
              <i className="ri-settings-3-line" />
            </button>
            <button className="inline-flex items-center px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              <i className="ri-upload-line mr-2" />
              Export
            </button>
          </div>
        </div>

        <ValidationPanel
          validationResults={validationResults}
          totalConcentration={currentIngredients.reduce((sum, ingredient) => sum + (ingredient.concentration || 0), 0)}
          maxConcentration={formulaConfig?.maxConcentration || 100}
        />

        <CupProgress
          totalIngredients={currentIngredients.length}
          totalConcentration={currentIngredients.reduce((sum, ingredient) => sum + (ingredient.concentration || 0), 0)}
          totalQuantity={currentIngredients.reduce((sum, ingredient) => sum + (ingredient.quantity || 0), 0)}
          totalCost={currentIngredients.reduce((sum, ingredient) => sum + (ingredient.cost || 0), 0)}
          maxConcentration={formulaConfig?.maxConcentration || 100}
        />
      </div>

      {/* Single Table Area */}
      <div
        ref={setDroppableRef}
        className={`flex-1 overflow-y-auto transition-colors ${isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''}`}
      >
        {currentIngredients.length === 0 ? (
          <div
            className={`flex items-center justify-center h-64 text-gray-400 text-lg border-2 border-dashed rounded-lg m-6 transition-colors ${
              isOver ? 'border-blue-400 bg-blue-50 text-blue-600' : 'border-gray-200'
            }`}
          >
            <div className="text-center">
              <i
                className={`ri-flask-line text-4xl mb-3 block ${
                  isOver ? 'text-blue-500' : ''
                }`}
              />
              <div className="font-medium mb-1">
                {isOver ? 'Release to add ingredient' : 'Drop ingredients here'}
              </div>
              <div className="text-sm">
                {isOver ? 'Add to your perfume formula' : 'Start building your perfume formula'}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm lg:text-base border border-gray-200 rounded-lg" style={{ minWidth: '800px' }}>
                <thead>
                  <tr className="border-b border-gray-200">
                    {columns
                      .filter((col) => col.visible)
                      .map((column) => (
                        <th
                          key={column.id}
                          className="text-left py-4 px-4 font-medium text-gray-900 bg-gray-50 first:rounded-tl-lg last:rounded-tr-lg cursor-pointer hover:bg-gray-100"
                          style={{ width: column.width }}
                          onClick={() => column.type !== 'actions' && setSortConfig({ key: column.id, direction: 'asc' })}
                        >
                          <div className="flex items-center gap-1">
                            {column.header}
                            {column.type !== 'actions' && sortConfig?.key === column.id && (
                              <i
                                className={`ri-arrow-${sortConfig.direction === 'asc' ? 'up' : 'down'}-s-line text-xs`}
                              />
                            )}
                          </div>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  <SortableContext items={currentIngredients} strategy={verticalListSortingStrategy}>
                    {currentIngredients
                      .sort((a, b) => {
                        if (sortConfig) {
                          if (a[sortConfig.key as keyof Ingredient] === null || a[sortConfig.key as keyof Ingredient] === undefined) {
                            return 1;
                          }
                          if (b[sortConfig.key as keyof Ingredient] === null || b[sortConfig.key as keyof Ingredient] === undefined) {
                            return -1;
                          }
                          if (typeof a[sortConfig.key as keyof Ingredient] === 'string' && typeof b[sortConfig.key as keyof Ingredient] === 'string') {
                            return sortConfig.direction === 'asc'
                              ? a[sortConfig.key as keyof Ingredient].localeCompare(b[sortConfig.key as keyof Ingredient])
                              : b[sortConfig.key as keyof Ingredient].localeCompare(a[sortConfig.key as keyof Ingredient]);
                          }
                          if (typeof a[sortConfig.key as keyof Ingredient] === 'number' && typeof b[sortConfig.key as keyof Ingredient] === 'number') {
                            return sortConfig.direction === 'asc'
                              ? a[sortConfig.key as keyof Ingredient] - b[sortConfig.key as keyof Ingredient]
                              : b[sortConfig.key as keyof Ingredient] - a[sortConfig.key as keyof Ingredient];
                          }
                          return 0;
                        }
                        return 0;
                      })
                      .map((ingredient, index) => (
                        <SortableIngredientRow
                          key={ingredient.id}
                          ingredient={ingredient}
                          onRemoveIngredient={handleIngredientRemove}
                          onUpdateIngredient={handleIngredientUpdate}
                          columns={columns}
                          validationResult={validationResults[ingredient.id]}
                          isLast={index === currentIngredients.length - 1}
                        />
                      ))}
                  </SortableContext>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showConfigModal && (
        <ConfigurationModal
          columns={columns}
          onUpdateColumns={setColumns}
          onClose={() => setShowConfigModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          trialName={trials.find((t) => t.id === showDeleteModal)?.name || ''}
          onConfirm={() => {
            const trialIndex = trials.findIndex((t) => t.id === showDeleteModal);
            const newTrials = trials.filter((t) => t.id !== showDeleteModal);
            setTrials(newTrials);

            if (activeTrialId === showDeleteModal) {
              const newActiveIndex = Math.max(0, trialIndex - 1);
              const newActiveTrial = newTrials[newActiveIndex];
              setActiveTrialId(newActiveTrial.id);
              onUpdateIngredients(newActiveTrial.ingredients);
            }

            setShowDeleteModal(null);
          }}
          onCancel={() => setShowDeleteModal(null)}
        />
      )}
    </div>
  );
}
