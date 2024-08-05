// src/components/SessionExpModal.js//this is not being used now because it was causing errors in App.js//leaving it here now to implement later.
import React from 'react';
import { Dialog } from '@headlessui/react';

const SessionExpModal = ({ isOpen, onClose, message }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded max-w-sm mx-auto p-6">
          <Dialog.Title className="text-lg font-bold">Session Expired</Dialog.Title>
          <Dialog.Description className="mt-2">{message}</Dialog.Description>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SessionExpModal;
