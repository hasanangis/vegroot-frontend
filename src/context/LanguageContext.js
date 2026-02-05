"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations'; 

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
 
  const [language, setLanguage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('vegrootLang');
      
      if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
        
        setLanguage(savedLang);
        setIsModalOpen(false);
      } else {
        
        setLanguage('en'); 
        setIsModalOpen(true);
      }
    }
  }, []);

  const selectLanguage = (newLang) => {
    setLanguage(newLang);
    setIsModalOpen(false); 
    if (typeof window !== 'undefined') {
      localStorage.setItem('vegrootLang', newLang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'tr' ? 'en' : 'tr';
    selectLanguage(newLang);
  };

  
  const t = translations[language || 'en'] || translations['en'];

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      selectLanguage, 
      isModalOpen,    
      setIsModalOpen, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}