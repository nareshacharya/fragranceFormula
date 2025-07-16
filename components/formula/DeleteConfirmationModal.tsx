'use client';

import Modal from '../ui/Modal';

interface DeleteConfirmationModalProps {
  trialName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({ trialName, onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <Modal 
      isOpen={true} 
      onClose={onCancel} 
      title="Delete Trial"
      size="sm"
      showCloseButton={false}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <i className="ri-alert-line text-red-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Trial</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the trial "{trialName}"? This action cannot be undone and will
          permanently delete all formulation data.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Trial
          </button>
        </div>
      </div>
    </Modal>
  );
}