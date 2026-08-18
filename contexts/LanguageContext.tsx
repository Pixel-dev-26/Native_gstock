import i18n from "@/localization/i18n";
import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type Language = "fr" | "en";
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
};

const LANGUAGE_KEY = "app_language";
const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    SecureStore.getItemAsync(LANGUAGE_KEY).then((storedLanguage) => {
      if (storedLanguage === "fr" || storedLanguage === "en") {
        setLanguageState(storedLanguage);
        void i18n.changeLanguage(storedLanguage);
      }
    });
  }, []);

  const setLanguage = async (nextLanguage: Language) => {
    await i18n.changeLanguage(nextLanguage);
    await SecureStore.setItemAsync(LANGUAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
