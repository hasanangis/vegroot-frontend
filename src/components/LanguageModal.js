// src/components/LanguageModal.js
"use client";
import { useLanguage } from '../context/LanguageContext';

export default function LanguageModal() {
  const { isModalOpen, selectLanguage } = useLanguage();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-vegroot-dark/90 z-[9999] flex items-center justify-center backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-vegroot-gold animate-fadeIn relative overflow-hidden">
        
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-vegroot-green/10 rounded-full blur-2xl"></div>

        <h2 className="text-4xl font-serif font-bold text-vegroot-dark mb-2">VegRoot.</h2>
        <p className="text-gray-500 mb-8 font-light text-lg">Choose your language / Dil seçimi</p>
        
        <div className="space-y-4">
          
          <button 
            onClick={() => selectLanguage('en')}
            className="w-full py-4 rounded-xl bg-vegroot-green text-white font-bold text-lg hover:bg-vegroot-dark shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            🇬🇧 Continue in English
          </button>

          
          <button 
            onClick={() => selectLanguage('tr')}
            className="w-full py-4 rounded-xl border-2 border-gray-200 text-gray-500 font-medium hover:border-vegroot-gold hover:text-vegroot-gold transition-all duration-300 flex items-center justify-center gap-3"
          >
            🇹🇷 Türkçe Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}