import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark";

export const themeColors = {
  light: {
    background: "#F5F7FB",
    surface: "#FFFFFF",
    surfaceMuted: "#F3F4F6",
    primary: "#4F46E5",
    primarySoft: "#E0E7FF",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    line: "#E4E4E7",
    inputBg: "#F5F5F5",
    inputBorder: "#E0E0E0",
    onPrimary: "#FFFFFF",
  },
  dark: {
    background: "#0F172A",
    surface: "#111827",
    surfaceMuted: "#1F2937",
    primary: "#818CF8",
    primarySoft: "#312E81",
    text: "#F9FAFB",
    textMuted: "#C7D2FE",
    border: "#334155",
    line: "#374151",
    inputBg: "#111827",
    inputBorder: "#374151",
    onPrimary: "#F8FAFC",
  },
} as const;

type ThemeContextType = {
  theme: ThemeMode;
  colors: (typeof themeColors)[ThemeMode];
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>(
    systemTheme === "dark" ? "dark" : "light",
  );

  const value = useMemo(
    () => ({
      theme,
      colors: themeColors[theme],
      toggleTheme: () =>
        setThemeState((current) => (current === "light" ? "dark" : "light")),
      setTheme: (nextTheme: ThemeMode) => setThemeState(nextTheme),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
