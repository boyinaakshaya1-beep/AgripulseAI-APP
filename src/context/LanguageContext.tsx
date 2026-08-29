import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS, Translations, getTranslation } from '../data/translations';
import { SUPPORTED_LANGUAGES, getLanguageConfig } from '../data/languages';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  languageConfig: ReturnType<typeof getLanguageConfig>;
  allLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is 'Telugu' as requested by user
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('agripulse_language');
      if (saved && ['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'Marathi'].includes(saved)) {
        return saved as SupportedLanguage;
      }
    } catch (e) {
      console.warn('Failed to read saved language', e);
    }
    return 'Telugu'; // Telugu is the default
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('agripulse_language', lang);
    } catch (e) {
      console.warn('Failed to save language', e);
    }
  };

  const t = getTranslation(language);
  const languageConfig = getLanguageConfig(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languageConfig,
        allLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
