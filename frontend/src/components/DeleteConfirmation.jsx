import React from 'react'

function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl overflow-hidden shadow-xl">
        <div className="px-6 py-4" style={{ backgroundColor: 'var(--primary)' }}>
          <h2 className="text-lg font-semibold text-white">Delete Confirmation</h2>
        </div>
        <div className="bg-white p-6">
          <p className="text-gray-700 mb-5">
            Are you sure you want to delete <span className="font-semibold">{itemName}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
