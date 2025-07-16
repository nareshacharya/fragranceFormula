"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ingredient, FormulaSection } from "./lib/ingredientsData";

interface IngredientDetailPopupProps {
  ingredient: Ingredient;
  onClose: () => void;
}

function IngredientDetailPopup({
  ingredient,
  onClose,
}: IngredientDetailPopupProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["basic"])
  );

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
      id: "basic",
      title: "Basic Information",
      icon: "ri-information-line",
      content: [
        { label: "Name", value: ingredient.name },
        { label: "CAS Number", value: ingredient.casNo || "N/A" },
        { label: "Category", value: ingredient.category || "N/A" },
        { label: "Subcategory", value: ingredient.subcategory || "N/A" },
        { label: "Description", value: ingredient.description || "N/A" },
      ],
    },
    {
      id: "olfactive",
      title: "Olfactive Profile",
      icon: "ri-nose-line",
      content: [
        {
          label: "Olfactive Family",
          value: ingredient.olfactiveFamily || "Floral",
        },
        { label: "Top Note", value: ingredient.topNote || "Fresh, Green" },
        { label: "Heart Note", value: ingredient.heartNote || "Floral, Sweet" },
        { label: "Base Note", value: ingredient.baseNote || "Woody, Musky" },
        { label: "Intensity", value: ingredient.intensity || "7/10" },
        { label: "Longevity", value: ingredient.longevity || "6-8 hours" },
      ],
    },
    {
      id: "technical",
      title: "Technical Properties",
      icon: "ri-flask-line",
      content: [
        {
          label: "Molecular Weight",
          value: ingredient.molecularWeight || "154.25 g/mol",
        },
        { label: "Boiling Point", value: ingredient.boilingPoint || "215°C" },
        { label: "Flash Point", value: ingredient.flashPoint || "93°C" },
        { label: "Solubility", value: ingredient.solubility || "Ethanol, Oil" },
        {
          label: "Stability",
          value: ingredient.stability || "Stable under normal conditions",
        },
        { label: "pH", value: ingredient.pH || "6.5-7.5" },
      ],
    },
    {
      id: "regulations",
      title: "Regulations & Certifications",
      icon: "ri-shield-check-line",
      content: [
        {
          label: "IFRA Category",
          value: ingredient.ifraCategory || "Category 1-4",
        },
        {
          label: "IFRA Restriction",
          value: ingredient.ifraRestriction || "0.1% max",
        },
        {
          label: "EU Cosmetic Regulation",
          value: ingredient.euRegulation || "Compliant",
        },
        { label: "FDA Status", value: ingredient.fdaStatus || "GRAS" },
        { label: "Halal Certified", value: ingredient.halalCertified || "Yes" },
        { label: "Vegan", value: ingredient.vegan || "Yes" },
      ],
    },
    {
      id: "usage",
      title: "Usage & Recommendations",
      icon: "ri-lightbulb-line",
      content: [
        {
          label: "Recommended Usage",
          value: ingredient.recommendedUsage || "0.5-2.0%",
        },
        {
          label: "Blends Well With",
          value: ingredient.blendsWellWith || "Rose, Jasmine, Sandalwood",
        },
        {
          label: "Application",
          value: ingredient.application || "Fine Fragrance, Personal Care",
        },
        {
          label: "Storage",
          value: ingredient.storage || "Cool, dry place, away from light",
        },
        { label: "Shelf Life", value: ingredient.shelfLife || "24 months" },
      ],
    },
    {
      id: "sustainability",
      title: "Sustainability",
      icon: "ri-leaf-line",
      content: [
        { label: "Origin", value: ingredient.origin || "France" },
        {
          label: "Extraction Method",
          value: ingredient.extractionMethod || "Steam Distillation",
        },
        {
          label: "Sustainability Score",
          value: ingredient.sustainabilityScore || "8/10",
        },
        {
          label: "Carbon Footprint",
          value: ingredient.carbonFootprint || "Low",
        },
        {
          label: "Biodegradability",
          value: ingredient.biodegradability || "Readily biodegradable",
        },
      ],
    },
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
              <h2 className="text-lg font-semibold text-gray-900">
                {ingredient.name}
              </h2>
              <p className="text-sm text-gray-500">
                Complete Ingredient Profile
              </p>
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
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 rounded-lg transition-colors ${
                    expandedSections.has(section.id) ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${section.icon} text-gray-600`}></i>
                    </div>
                    <span className="font-medium text-gray-900">
                      {section.title}
                    </span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i
                      className={`ri-arrow-${
                        expandedSections.has(section.id) ? "up" : "down"
                      }-s-line text-gray-400`}
                    ></i>
                  </div>
                </button>

                {expandedSections.has(section.id) && (
                  <div className="px-3 pb-3">
                    <div className="grid grid-cols-2 gap-3">
                      {section.content.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white p-2 rounded border border-gray-100"
                        >
                          <div className="text-xs font-medium text-gray-500 mb-1">
                            {item.label}
                          </div>
                          <div className="text-sm text-gray-900">
                            {item.value}
                          </div>
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
  type: "text" | "number" | "currency" | "actions";
}

interface FormulaConfig {
  maxConcentration: number;
  regulations: {
    ifraCategories: Record<
      string,
      { maxConcentration: number; description: string }
    >;
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

interface DraggableIngredientRowProps {
  ingredient: Ingredient;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (
    ingredientId: string,
    updates: Partial<Ingredient>
  ) => void;
  columns: ColumnConfig[];
  validationResult?: ValidationResult;
}

interface InlineEditCellProps {
  value: number;
  type: "concentration" | "quantity";
  onUpdate: (value: number) => void;
  hasError?: boolean;
}

interface SortableIngredientRowProps {
  ingredient: Ingredient;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (
    ingredientId: string,
    updates: Partial<Ingredient>
  ) => void;
  columns: ColumnConfig[];
  validationResult?: ValidationResult;
}

interface DeleteConfirmationModalProps {
  trialName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmationModal({
  trialName,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText === trialName;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-alert-line text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Trial
            </h3>
          </div>

          <p className="text-gray-600 mb-4">
            This action cannot be undone. This will permanently delete the trial
            "{trialName}" and all its formulation data.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type "{trialName}" to confirm deletion:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
              placeholder={trialName}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!isConfirmValid}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isConfirmValid
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Delete Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TrialTabProps {
  trial: Trial;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  canDelete: boolean;
}

function TrialTab({
  trial,
  isActive,
  onClick,
  onDelete,
  onRename,
  canDelete,
}: TrialTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(trial.name);

  const handleSaveName = () => {
    if (editName.trim()) {
      onRename(editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      setEditName(trial.name);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group relative flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
        isActive
          ? "bg-blue-100 text-blue-800 border border-blue-200"
          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent"
      }`}
      onClick={onClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSaveName}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-none outline-none text-sm font-medium w-20"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span
          className="text-sm font-medium"
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {trial.name}
        </span>
      )}

      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors ${
            isActive
              ? "text-blue-600 hover:bg-blue-200"
              : "text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          } opacity-0 group-hover:opacity-100`}
        >
          <i className="ri-close-line text-xs"></i>
        </button>
      )}
    </div>
  );
}

interface CupProgressProps {
  totalIngredients: number;
  totalConcentration: number;
  totalQuantity: number;
  totalCost: number;
  maxConcentration?: number;
}

function CupProgress({
  totalIngredients,
  totalConcentration,
  totalQuantity,
  totalCost,
  maxConcentration = 100,
}: CupProgressProps) {
  const fillPercentage = Math.min(
    (totalConcentration / maxConcentration) * 100,
    100
  );
  const isOverfilled = totalConcentration > maxConcentration;
  const bottleColor = isOverfilled ? "#EF4444" : "#8B5CF6";

  return (
    <div className="flex items-center justify-between gap-8 px-4 py-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl">
      {/* Perfume Bottle Visualization - Made Even Wider */}
      <div className="relative flex-shrink-0">
        <div className="w-24 h-28 relative">
          {/* Perfume Bottle SVG - Made Much Wider */}
          <svg
            width="96"
            height="112"
            viewBox="0 0 96 112"
            className="absolute inset-0"
          >
            {/* Bottle neck */}
            <rect
              x="38"
              y="12"
              width="20"
              height="12"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1.5"
              rx="1"
            />
            {/* Bottle cap */}
            <rect x="36" y="8" width="24" height="6" fill="#D1D5DB" rx="2" />
            {/* Main bottle body - Much Wider */}
            <path
              d="M18 24 L18 90 Q18 98 26 98 L70 98 Q78 98 78 90 L78 24 Z"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            {/* Bottle shoulder */}
            <path
              d="M38 24 Q18 24 18 24 L78 24 Q58 24 58 24"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />

            {/* Liquid fill */}
            <defs>
              <clipPath id="bottleClip">
                <path d="M20 26 L20 88 Q20 96 26 96 L70 96 Q76 96 76 88 L76 26 Z" />
              </clipPath>
              <linearGradient
                id="liquidGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={bottleColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={bottleColor} stopOpacity="0.6" />
              </linearGradient>
            </defs>

            <rect
              x="20"
              y={26 + (70 * (100 - fillPercentage)) / 100}
              width="56"
              height={(70 * fillPercentage) / 100}
              fill="url(#liquidGradient)"
              clipPath="url(#bottleClip)"
            >
              <animate
                attributeName="opacity"
                values="0.6;0.8;0.6"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Liquid surface with wave animation */}
            {fillPercentage > 0 && (
              <ellipse
                cx="48"
                cy={26 + (70 * (100 - fillPercentage)) / 100}
                rx="28"
                ry="3"
                fill={bottleColor}
                opacity="0.8"
                clipPath="url(#bottleClip)"
              >
                <animate
                  attributeName="ry"
                  values="3;4;3"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </ellipse>
            )}

            {/* Percentage Text Inside Bottle */}
            {fillPercentage > 15 && (
              <text
                x="48"
                y={
                  26 +
                  (70 * (100 - fillPercentage)) / 100 +
                  (70 * fillPercentage) / 200
                }
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
              >
                {totalConcentration.toFixed(1)}%
              </text>
            )}

            {/* Sparkle effects for animation */}
            {fillPercentage > 20 && (
              <>
                <circle cx="38" cy="50" r="1" fill="#FBBF24" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.8;0.2;0.8"
                    dur="1.5s"
                    repeatCount="indefinite"
                    begin="0s"
                  />
                </circle>
                <circle cx="58" cy="60" r="1" fill="#FBBF24" opacity="0.6">
                  <animate
                    attributeName="opacity"
                    values="0.6;0.1;0.6"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <circle cx="42" cy="75" r="1" fill="#FBBF24" opacity="0.7">
                  <animate
                    attributeName="opacity"
                    values="0.7;0.2;0.7"
                    dur="2.2s"
                    repeatCount="indefinite"
                    begin="1s"
                  />
                </circle>
                <circle cx="64" cy="45" r="1" fill="#FBBF24" opacity="0.5">
                  <animate
                    attributeName="opacity"
                    values="0.5;0.1;0.5"
                    dur="2.8s"
                    repeatCount="indefinite"
                    begin="1.5s"
                  />
                </circle>
              </>
            )}
          </svg>

          {/* Overflow indicator */}
          {isOverfilled && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <i className="ri-error-warning-line text-white text-sm"></i>
              </div>
            </div>
          )}
        </div>

        {/* Percentage label below bottle - Only show when liquid is too low */}
        {fillPercentage <= 15 && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div
              className={`text-sm font-bold px-3 py-1 rounded-full shadow-sm ${
                isOverfilled
                  ? "bg-red-100 text-red-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {totalConcentration.toFixed(1)}%
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats in Single Row */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-flask-line text-blue-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              {totalIngredients}
            </div>
            <div className="text-sm text-gray-500">Ingredients</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-scales-3-line text-amber-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              {totalQuantity.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">ml Volume</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-money-dollar-circle-line text-green-600 text-sm"></i>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">
              ${totalCost.toFixed(0)}
            </div>
            <div className="text-sm text-gray-500">Total Cost</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-3 shadow-sm">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="ri-percent-line text-purple-600 text-sm"></i>
          </div>
          <div>
            <div
              className={`font-bold text-lg ${
                isOverfilled ? "text-red-600" : "text-gray-900"
              }`}
            >
              {totalConcentration.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Concentration</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormulaCanvasProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onUpdateIngredient: (
    ingredientId: string,
    updates: Partial<Ingredient>
  ) => void;
  onUpdateIngredients: (ingredients: Ingredient[]) => void;
}

export default function FormulaCanvas({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  onUpdateIngredients,
}: FormulaCanvasProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [trialCounter, setTrialCounter] = useState(1);
  const [trials, setTrials] = useState<Trial[]>([
    {
      id: "trial-1",
      name: "Trial 1",
      ingredients: [],
      createdAt: new Date(),
    },
  ]);
  const [activeTrialId, setActiveTrialId] = useState("trial-1");
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [formulaConfig, setFormulaConfig] = useState<FormulaConfig | null>(
    null
  );
  const [validationResults, setValidationResults] = useState<
    Record<string, ValidationResult>
  >({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [trialsScrollIndex, setTrialsScrollIndex] = useState(0);

  const { setNodeRef, isOver } = useDroppable({
    id: "formula-canvas",
  });

  // Memoize active trial and current ingredients to prevent unnecessary recalculations
  const activeTrial = useMemo(
    () => trials.find((t) => t.id === activeTrialId),
    [trials, activeTrialId]
  );
  const currentIngredients = useMemo(
    () => activeTrial?.ingredients || [],
    [activeTrial?.ingredients]
  );

  // Load configuration only once on mount
  useEffect(() => {
    let isMounted = true;

    const loadConfig = async () => {
      try {
        const [columnConfig, formulaConfigData] = await Promise.all([
          import("@/lib/columnConfig.json"),
          import("@/lib/formulaConfig.json"),
        ]);

        if (isMounted) {
          setColumns(columnConfig.defaultColumns);
          setFormulaConfig(formulaConfigData);
        }
      } catch (error) {
        console.error("Failed to load configuration:", error);
        if (isMounted) {
          setColumns([
            {
              id: "name",
              header: "Compound",
              width: "25%",
              visible: true,
              type: "text",
            },
            {
              id: "cas",
              header: "CAS No",
              width: "12%",
              visible: true,
              type: "text",
            },
            {
              id: "concentration",
              header: "Concentration (%)",
              width: "12%",
              visible: true,
              type: "number",
            },
            {
              id: "quantity",
              header: "Quantity (ml)",
              width: "12%",
              visible: true,
              type: "number",
            },
            {
              id: "cost",
              header: "Cost ($)",
              width: "10%",
              visible: true,
              type: "currency",
            },
            {
              id: "actions",
              header: "Actions",
              width: "10%",
              visible: true,
              type: "actions",
            },
          ]);
          setFormulaConfig({
            maxConcentration: 100,
            regulations: {
              ifraCategories: {},
              allergens: { required: [], declarationThreshold: 0.001 },
            },
            validations: {
              concentrationLimits: {
                individual: { min: 0, max: 50 },
                total: { min: 0, max: 100 },
              },
              quantityLimits: { individual: { min: 0, max: 1000 } },
            },
          });
        }
      }

      return () => {
        isMounted = false;
      };
    };

    loadConfig();
  }, []);

  // Memoize ingredients equality check
  const ingredientsEqual = useCallback(
    (arr1: Ingredient[], arr2: Ingredient[]) => {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((ing, index) => {
        const other = arr2[index];
        return (
          other &&
          ing.id === other.id &&
          ing.concentration === other.concentration &&
          ing.quantity === other.quantity
        );
      });
    },
    []
  );

  // Update active trial when ingredients change - but only when actually different
  useEffect(() => {
    if (!ingredientsEqual(ingredients, currentIngredients)) {
      setTrials((prev) =>
        prev.map((trial) =>
          trial.id === activeTrialId
            ? { ...trial, ingredients: [...ingredients] }
            : trial
        )
      );
    }
  }, [ingredients, currentIngredients, activeTrialId, ingredientsEqual]);

  // Update trial counter only when trials array changes
  const maxTrialNumber = useMemo(() => {
    return trials.reduce((max, trial) => {
      const match = trial.id.match(/trial-(\d+)/);
      return match ? Math.max(max, parseInt(match[1])) : max;
    }, 0);
  }, [trials]);

  useEffect(() => {
    setTrialCounter(maxTrialNumber);
  }, [maxTrialNumber]);

  const visibleTrialsCount = 4;
  const maxTrialsScrollIndex = Math.max(0, trials.length - visibleTrialsCount);

  const scrollTrialsLeft = useCallback(() => {
    setTrialsScrollIndex(Math.max(0, trialsScrollIndex - 1));
  }, [trialsScrollIndex]);

  const scrollTrialsRight = useCallback(() => {
    setTrialsScrollIndex(Math.min(maxTrialsScrollIndex, trialsScrollIndex + 1));
  }, [trialsScrollIndex, maxTrialsScrollIndex]);

  const addNewTrial = useCallback(() => {
    const newTrialNumber = trialCounter + 1;
    const newTrial: Trial = {
      id: `trial-${newTrialNumber}`,
      name: `Trial ${newTrialNumber}`,
      ingredients: [],
      createdAt: new Date(),
    };

    setTrialCounter(newTrialNumber);
    setTrials((prev) => [...prev, newTrial]);
    setActiveTrialId(newTrial.id);
    onUpdateIngredients([]);
  }, [trialCounter, onUpdateIngredients]);

  const switchTrial = useCallback(
    (trialId: string) => {
      if (trialId !== activeTrialId) {
        setActiveTrialId(trialId);

        const newTrial = trials.find((t) => t.id === trialId);
        if (newTrial) {
          onUpdateIngredients(newTrial.ingredients);
        }
      }
    },
    [activeTrialId, trials, onUpdateIngredients]
  );

  const deleteTrialTab = useCallback(
    (trialId: string) => {
      if (trials.length <= 1) return;
      setShowDeleteModal(trialId);
    },
    [trials.length]
  );

  const confirmDeleteTrial = useCallback(
    (trialId: string) => {
      const trialIndex = trials.findIndex((t) => t.id === trialId);
      const newTrials = trials.filter((t) => t.id !== trialId);
      setTrials(newTrials);

      if (activeTrialId === trialId) {
        const newActiveIndex = Math.max(0, trialIndex - 1);
        const newActiveTrial = newTrials[newActiveIndex];
        setActiveTrialId(newActiveTrial.id);
        onUpdateIngredients(newActiveTrial.ingredients);
      }

      setShowDeleteModal(null);
    },
    [trials, activeTrialId, onUpdateIngredients]
  );

  const renameTrialTab = useCallback((trialId: string, newName: string) => {
    setTrials((prev) =>
      prev.map((trial) =>
        trial.id === trialId ? { ...trial, name: newName } : trial
      )
    );
  }, []);

  const handleSort = useCallback(
    (columnId: string) => {
      let direction: "asc" | "desc" = "asc";
      if (
        sortConfig &&
        sortConfig.key === columnId &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      setSortConfig({ key: columnId, direction });
    },
    [sortConfig]
  );

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = currentIngredients.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = currentIngredients.findIndex(
          (item) => item.id === over.id
        );

        const newIngredients = arrayMove(
          currentIngredients,
          oldIndex,
          newIndex
        );
        onUpdateIngredients(newIngredients);
      }
    },
    [currentIngredients, onUpdateIngredients]
  );

  // Memoize sorted ingredients
  const getSortedIngredients = useMemo(() => {
    if (!sortConfig) return currentIngredients;

    const sorted = [...currentIngredients].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Ingredient];
      const bValue = b[sortConfig.key as keyof Ingredient];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [currentIngredients, sortConfig]);

  // Memoize calculations
  const calculations = useMemo(() => {
    const totalItems = currentIngredients.length;
    const totalCost = currentIngredients.reduce(
      (sum, ingredient) => sum + (ingredient.cost || 0),
      0
    );
    const totalConcentration = currentIngredients.reduce(
      (sum, ingredient) => sum + (ingredient.concentration || 0),
      0
    );
    const totalQuantity = currentIngredients.reduce(
      (sum, ingredient) => sum + (ingredient.quantity || 0),
      0
    );

    return { totalItems, totalCost, totalConcentration, totalQuantity };
  }, [currentIngredients]);

  const visibleColumns = useMemo(
    () => columns.filter((col) => col.visible),
    [columns]
  );
  const maxConcentration = formulaConfig?.maxConcentration || 100;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Trials Tab Bar with Navigation */}
      <div className="border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Left scroll arrow */}
            <button
              onClick={scrollTrialsLeft}
              disabled={trialsScrollIndex === 0}
              className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                trialsScrollIndex === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <i className="ri-arrow-left-s-line text-sm" />
            </button>

            {/* Trials tabs container */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex items-center gap-1 transition-transform duration-200"
                style={{
                  transform: `translateX(-${
                    trialsScrollIndex * (100 / visibleTrialsCount)
                  }%)`,
                }}
              >
                {trials.map((trial) => (
                  <div
                    key={trial.id}
                    className="flex-shrink-0"
                    style={{
                      minWidth: `calc(${100 / visibleTrialsCount}% - 0.25rem)`,
                    }}
                  >
                    <TrialTab
                      trial={trial}
                      isActive={trial.id === activeTrialId}
                      onClick={() => switchTrial(trial.id)}
                      onDelete={() => deleteTrialTab(trial.id)}
                      onRename={(newName) => renameTrialTab(trial.id, newName)}
                      canDelete={trials.length > 1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right scroll arrow */}
            <button
              onClick={scrollTrialsRight}
              disabled={trialsScrollIndex >= maxTrialsScrollIndex}
              className={`w-6 h-6 flex items-center justify-center rounded flex-shrink-0 ${
                trialsScrollIndex >= maxTrialsScrollIndex
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <i className="ri-arrow-right-s-line text-sm" />
            </button>

            {/* Add trial button */}
            <button
              onClick={addNewTrial}
              className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ml-2"
            >
              <i className="ri-add-line"></i>
              Add Trial
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Content */}
      <div className="p-3 lg:p-4 bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-4">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
            Formula Builder
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              title="Configure Table"
            >
              <i className="ri-settings-3-line"></i>
            </button>
            <button className="inline-flex items-center px-3 py-2 text-gray-600 rounded-lg text-sm hover:bg-gray-100 transition-colors">
              <i className="ri-upload-line mr-2"></i>
              Export
            </button>
          </div>
        </div>

        <ValidationPanel
          validationResults={validationResults}
          totalConcentration={calculations.totalConcentration}
          maxConcentration={maxConcentration}
        />

        <CupProgress
          totalIngredients={calculations.totalItems}
          totalConcentration={calculations.totalConcentration}
          totalQuantity={calculations.totalQuantity}
          totalCost={calculations.totalCost}
          maxConcentration={maxConcentration}
        />
      </div>

      {/* Single Table Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 overflow-y-auto transition-colors ${
          isOver ? "bg-purple-50 border-purple-200" : ""
        }`}
      >
        {currentIngredients.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 text-lg border-2 border-dashed border-gray-200 rounded-lg m-6">
            <div className="text-center">
              <i className="ri-flask-line text-4xl mb-3 block"></i>
              <div className="font-medium mb-1">Drop ingredients here</div>
              <div className="text-sm">Start building your perfume formula</div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table
                className="w-full text-sm lg:text-base"
                style={{ minWidth: "800px" }}
              >
                <thead>
                  <tr className="border-b border-gray-200">
                    {visibleColumns.map((column) => (
                      <th
                        key={column.id}
                        className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 bg-gray-50 sticky top-0 cursor-pointer hover:bg-gray-100"
                        style={{ width: column.width }}
                        onClick={() =>
                          column.type !== "actions" && handleSort(column.id)
                        }
                      >
                        <div className="flex items-center gap-1">
                          {column.header}
                          {column.type !== "actions" &&
                            sortConfig?.key === column.id && (
                              <i
                                className={`ri-arrow-${
                                  sortConfig.direction === "asc" ? "up" : "down"
                                }-s-line text-xs`}
                              ></i>
                            )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <SortableContext
                    items={getSortedIngredients.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {getSortedIngredients.map((ingredient) => (
                      <SortableIngredientRow
                        key={ingredient.id}
                        ingredient={ingredient}
                        onRemoveIngredient={onRemoveIngredient}
                        onUpdateIngredient={onUpdateIngredient}
                        columns={columns}
                        validationResult={validationResults[ingredient.id]}
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
          trialName={trials.find((t) => t.id === showDeleteModal)?.name || ""}
          onConfirm={() => confirmDeleteTrial(showDeleteModal)}
          onCancel={() => setShowDeleteModal(null)}
        />
      )}
    </div>
  );
}

function DraggableIngredientRow({
  ingredient,
  onRemoveIngredient,
  onUpdateIngredient,
  columns,
  validationResult,
}: DraggableIngredientRowProps) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ingredient.id,
      data: { ingredient },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: "relative" as const,
        zIndex: 1000,
      }
    : undefined;

  const visibleColumns = columns.filter((col) => col.visible);
  const hasErrors = validationResult && !validationResult.isValid;

  const renderCell = (column: ColumnConfig) => {
    switch (column.id) {
      case "name":
        return (
          <div className="flex items-center space-x-2">
            <div
              {...listeners}
              {...attributes}
              className="w-4 h-4 flex items-center justify-center cursor-grab hover:text-gray-700 text-gray-400 flex-shrink-0"
            >
              <i className="ri-draggable"></i>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm truncate">
                {ingredient.name}
              </span>
              {hasErrors && (
                <i
                  className="ri-error-warning-line text-red-500 text-sm"
                  title={validationResult?.errors.join(", ")}
                ></i>
              )}
            </div>
          </div>
        );
      case "cas":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.casNo || "N/A"}
          </span>
        );
      case "concentration":
        return (
          <InlineEditCell
            value={ingredient.concentration || 0}
            type="concentration"
            onUpdate={(value) =>
              onUpdateIngredient(ingredient.id, { concentration: value })
            }
            hasError={hasErrors}
          />
        );
      case "quantity":
        return (
          <InlineEditCell
            value={ingredient.quantity || 0}
            type="quantity"
            onUpdate={(value) =>
              onUpdateIngredient(ingredient.id, { quantity: value })
            }
          />
        );
      case "cost":
        return (
          <span className="text-sm font-medium">${ingredient.cost || 0}</span>
        );
      case "category":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.category || "N/A"}
          </span>
        );
      case "subcategory":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.subcategory || "N/A"}
          </span>
        );
      case "intensity":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.intensity || "N/A"}
          </span>
        );
      case "longevity":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.longevity || "N/A"}
          </span>
        );
      case "ifra":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.ifraCategory || "N/A"}
          </span>
        );
      case "allergen":
        return (
          <span
            className={`text-xs truncate ${
              ingredient.allergenicity ? "text-red-600" : "text-green-600"
            }`}
          >
            {ingredient.allergenicity ? "Yes" : "No"}
          </span>
        );
      case "actions":
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
        className={`border-b border-gray-100 hover:bg-gray-50 ${
          isDragging ? "opacity-50" : ""
        } ${hasErrors ? "bg-red-50" : ""}`}
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

function SortableIngredientRow({
  ingredient,
  onRemoveIngredient,
  onUpdateIngredient,
  columns,
  validationResult,
}: SortableIngredientRowProps) {
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: ingredient.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
  };

  const visibleColumns = columns.filter((col) => col.visible);
  const hasErrors = validationResult && !validationResult.isValid;

  const renderCell = (column: ColumnConfig) => {
    switch (column.id) {
      case "name":
        return (
          <div className="flex items-center space-x-2">
            <div
              {...listeners}
              {...attributes}
              className="w-4 h-4 flex items-center justify-center cursor-grab hover:text-gray-700 text-gray-400 flex-shrink-0"
            >
              <i className="ri-draggable"></i>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 text-sm truncate">
                {ingredient.name}
              </span>
              {hasErrors && (
                <i
                  className="ri-error-warning-line text-red-500 text-sm"
                  title={validationResult?.errors.join(", ")}
                ></i>
              )}
            </div>
          </div>
        );
      case "cas":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.casNo || "N/A"}
          </span>
        );
      case "concentration":
        return (
          <InlineEditCell
            value={ingredient.concentration || 0}
            type="concentration"
            onUpdate={(value) =>
              onUpdateIngredient(ingredient.id, { concentration: value })
            }
            hasError={hasErrors}
          />
        );
      case "quantity":
        return (
          <InlineEditCell
            value={ingredient.quantity || 0}
            type="quantity"
            onUpdate={(value) =>
              onUpdateIngredient(ingredient.id, { quantity: value })
            }
          />
        );
      case "cost":
        return (
          <span className="text-sm font-medium">${ingredient.cost || 0}</span>
        );
      case "category":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.category || "N/A"}
          </span>
        );
      case "subcategory":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.subcategory || "N/A"}
          </span>
        );
      case "intensity":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.intensity || "N/A"}
          </span>
        );
      case "longevity":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.longevity || "N/A"}
          </span>
        );
      case "ifra":
        return (
          <span className="text-xs text-gray-600 truncate">
            {ingredient.ifraCategory || "N/A"}
          </span>
        );
      case "allergen":
        return (
          <span
            className={`text-xs truncate ${
              ingredient.allergenicity ? "text-red-600" : "text-green-600"
            }`}
          >
            {ingredient.allergenicity ? "Yes" : "No"}
          </span>
        );
      case "actions":
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
        className={`border-b border-gray-100 hover:bg-gray-50 ${
          isDragging ? "opacity-50" : ""
        } ${hasErrors ? "bg-red-50" : ""}`}
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

function InlineEditCell({
  value,
  type,
  onUpdate,
  hasError,
}: InlineEditCellProps) {
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
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
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
          className={`w-16 px-2 py-1 border rounded text-sm ${
            hasError ? "border-red-300" : "border-gray-300"
          }`}
          min="0"
          max={type === "concentration" ? "100" : undefined}
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
      className={`flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ${
        hasError ? "text-red-600" : ""
      }`}
      onClick={() => setIsEditing(true)}
    >
      <span className="text-sm">
        {value}
        {type === "concentration" ? "%" : " ml"}
      </span>
      <i className="ri-edit-line text-xs text-gray-400"></i>
    </div>
  );
}

interface ConfigurationModalProps {
  columns: ColumnConfig[];
  onUpdateColumns: (columns: ColumnConfig[]) => void;
  onClose: () => void;
}

function ConfigurationModal({
  columns,
  onUpdateColumns,
  onClose,
}: ConfigurationModalProps) {
  const [tempColumns, setTempColumns] = useState<ColumnConfig[]>(columns);

  const toggleColumn = (columnId: string) => {
    setTempColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
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
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Column Configuration
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="text-sm text-gray-600 mb-4">
            Configure which columns appear in the ingredient table. Reorder
            columns using the arrow buttons and toggle visibility with
            checkboxes.
          </div>
          <div className="space-y-3">
            {tempColumns.map((column, index) => (
              <div
                key={column.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        index > 0 && reorderColumn(index, index - 1)
                      }
                      disabled={index === 0}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        index === 0
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <i className="ri-arrow-up-s-line"></i>
                    </button>
                    <button
                      onClick={() =>
                        index < tempColumns.length - 1 &&
                        reorderColumn(index, index + 1)
                      }
                      disabled={index === tempColumns.length - 1}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        index === tempColumns.length - 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
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
                    <label className="text-sm font-medium text-gray-700">
                      Visible
                    </label>
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={column.header}
                      onChange={(e) =>
                        updateColumnHeader(column.id, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Column Header"
                    />
                  </div>

                  <div className="text-sm text-gray-500 w-16 text-center">
                    {column.type}
                  </div>
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

interface ValidationPanelProps {
  validationResults: Record<string, ValidationResult>;
  totalConcentration: number;
  maxConcentration: number;
}

function ValidationPanel({
  validationResults,
  totalConcentration,
  maxConcentration,
}: ValidationPanelProps) {
  const allErrors = Object.values(validationResults).flatMap(
    (result) => result.errors
  );
  const allWarnings = Object.values(validationResults).flatMap(
    (result) => result.warnings
  );
  const isOverLimit = totalConcentration > maxConcentration;

  if (allErrors.length === 0 && allWarnings.length === 0 && !isOverLimit) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-start gap-2">
        <i className="ri-alert-line text-yellow-600 mt-0.5"></i>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Validation Issues
          </h4>
          {isOverLimit && (
            <div className="text-sm text-red-600 mb-2">
              Total concentration ({totalConcentration.toFixed(1)}%) exceeds
              maximum allowed ({maxConcentration}%)
            </div>
          )}
          {allErrors.length > 0 && (
            <div className="mb-2">
              <div className="text-sm font-medium text-red-600 mb-1">
                Errors:
              </div>
              <ul className="text-sm text-red-600 list-disc list-inside">
                {allErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {allWarnings.length > 0 && (
            <div>
              <div className="text-sm font-medium text-yellow-600 mb-1">
                Warnings:
              </div>
              <ul className="text-sm text-yellow-600 list-disc list-inside">
                {allWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
