import React, { useState, createContext, useContext } from 'react';

const LangContext = createContext({ lang: 'fr', setLang: () => {} });
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}