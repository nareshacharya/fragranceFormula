'use client';

import { useState } from 'react';
import { Ingredient } from '@/lib/ingredientsData';
import Modal from '../ui/Modal';

interface IngredientDetailPopupProps {
  ingredient: Ingredient;
  onClose: () => void;
}

export default function IngredientDetailPopup({ ingredient, onClose }: IngredientDetailPopupProps) {
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
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={ingredient.name}
      size="lg"
    >
      <div className="p-4">
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
    </Modal>
  );
}