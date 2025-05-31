'use client';

import React, { useState } from 'react';

const DeleteAccount: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10); // Only digits, max 10
    setPhoneNumber(value);
    setIsValid(value.length === 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setShowModal(true);
    }
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    setIsSubmitted(true);
    // API call would go here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Delete Your Account</h1>
        <p className="text-gray-500 mt-2">This will permanently remove your account and all associated data</p>
      </div>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Indian Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">+91</span>
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handleInputChange}
                maxLength={10}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="9876543210"
                pattern="[0-9]{10}"
                required
              />
            </div>
            {phoneNumber.length > 0 && phoneNumber.length < 10 && (
              <p className="mt-2 text-sm text-red-600">Please enter a valid 10-digit number</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isValid 
                ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Delete Account
          </button>
        </form>
      ) : (
        <div className="p-6 bg-green-50 rounded-lg border border-green-100">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Request Submitted</h2>
            <div className="mt-4 text-sm text-gray-600 space-y-3">
              <p>We&apos;ve received your request to delete the account associated with <strong>+91 {phoneNumber}</strong>.</p>
              <p>You&apos;ll receive an SMS confirmation within <strong>48 hours</strong>.</p>
              <p>Account deletion will be completed within <strong>90 days</strong> as per our policy.</p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full overflow-hidden">
            <div className="p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently delete your account and all data. You won&apos;t be able to recover any information.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row-reverse sm:px-6 gap-3">
              <button
                onClick={handleConfirmDelete}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Account
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;