import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import portugueseTranslation from "@/lib/i18n/locales/pt";
import englishTranslation from "@/lib/i18n/locales/en";
import spanishTranslations from "@/lib/i18n/locales/es";

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
      es: {
        translation: spanishTranslations,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
