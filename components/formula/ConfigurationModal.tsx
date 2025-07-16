'use client';

import { useState } from 'react';
import Modal from '../ui/Modal';

interface ColumnConfig {
  id: string;
  header: string;
  width: string;
  visible: boolean;
  type: 'text' | 'number' | 'currency' | 'actions';
}

interface ConfigurationModalProps {
  columns: ColumnConfig[];
  onUpdateColumns: (columns: ColumnConfig[]) => void;
  onClose: () => void;
}

export default function ConfigurationModal({ columns, onUpdateColumns, onClose }: ConfigurationModalProps) {
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
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title="Column Configuration"
      size="lg"
    >
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-4">
          Configure which columns appear in the ingredient table. Reorder columns using the arrow buttons and toggle
          visibility with checkboxes.
        </div>
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

                <div className="text-sm text-gray-500 w-16 text-center">{column.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
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
    </Modal>
  );
}