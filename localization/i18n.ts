import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    fallbackLng: "fr",
    lng: "fr",
    interpolation: { escapeValue: false },
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
  });
}

export default i18n;
