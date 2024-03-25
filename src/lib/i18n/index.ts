import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import portugueseTranslation from "./locales/pt";
import englishTranslation from "./locales/en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pt",
    resources: {
      pt: {
        translation: portugueseTranslation,
      },
      en: {
        translation: englishTranslation,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
