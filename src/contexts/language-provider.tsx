/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

type ILanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: string;
};

type ILanguageProviderState = {
  language: string;
  setLanguage: (language: string) => void;
};

const initialState: ILanguageProviderState = {
  language: "pt",
  setLanguage: () => null,
};

const LanguageProviderContext =
  createContext<ILanguageProviderState>(initialState);

export function LanguageProvider({ children }: ILanguageProviderProps) {
  const { i18n } = useTranslation();

  function setLanguage(language: string) {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    const language = localStorage.getItem("language") || "pt";

    i18n.changeLanguage(language);
  }, []);

  return (
    <LanguageProviderContext.Provider
      value={{ language: i18n.language, setLanguage }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
