import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

export const LANGS = { EN: 'en', HI: 'hi' };

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(LANGS.EN);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === LANGS.EN ? LANGS.HI : LANGS.EN);
  }, []);

  const isHindi = lang === LANGS.HI;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
};
