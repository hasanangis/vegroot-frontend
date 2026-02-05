"use client";
import React, { createContext, useContext, useState } from 'react';
import { useLanguage } from './LanguageContext';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const { language } = useLanguage();
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'success' });

  const showModal = (message, type = 'success') => {
    setModal({ isOpen: true, message, type });
  };

  const closeModal = () => setModal({ ...modal, isOpen: false });

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-sm w-full text-center border border-green-50 animate-in zoom-in duration-300">
            <div className={`text-6xl mb-4 ${modal.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {modal.type === 'success' ? '🌱' : '⚠️'}
            </div>
            <h3 className="text-2xl font-serif font-bold text-green-900 mb-6 leading-tight">
              {modal.message}
            </h3>
            <button 
              onClick={closeModal}
              className="w-full py-4 bg-green-900 text-white rounded-2xl font-bold hover:bg-green-800 transition-all shadow-lg active:scale-95"
            >
              {language === 'tr' ? 'Tamam' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);