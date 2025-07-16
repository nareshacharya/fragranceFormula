'use client';

import { useState } from 'react';

interface Trial {
  id: string;
  name: string;
  ingredients: any[];
  createdAt: Date;
}

interface TrialTabProps {
  trial: Trial;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  canDelete: boolean;
}

export default function TrialTab({ trial, isActive, onClick, onDelete, onRename, canDelete }: TrialTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(trial.name);

  const handleSaveName = () => {
    if (editName.trim()) {
      onRename(editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setEditName(trial.name);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group relative flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all min-w-0 max-w-32 ${
        isActive ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
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
          className="bg-transparent border-none outline-none text-sm font-medium min-w-12 flex-1"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span
          className="text-sm font-medium truncate flex-1"
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          title={trial.name}
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
          className={`w-4 h-4 flex items-center justify-center rounded-full transition-colors flex-shrink-0 ${
            isActive ? 'text-blue-600 hover:bg-blue-200' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          } opacity-0 group-hover:opacity-100`}
        >
          <i className="ri-close-line text-xs"></i>
        </button>
      )}
    </div>
  );
}