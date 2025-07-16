'use client';

import { useState } from 'react';

interface InlineEditCellProps {
  value: number;
  type: 'concentration' | 'quantity';
  onUpdate: (value: number) => void;
  hasError?: boolean;
}

export default function InlineEditCell({ value, type, onUpdate, hasError }: InlineEditCellProps) {
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
          className={`w-16 px-2 py-1 border rounded text-sm ${hasError ? 'border-red-300' : 'border-gray-300'}`}
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
      className={`flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded ${hasError ? 'text-red-600' : ''}`}
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