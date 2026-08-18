import { ThemeProvider } from "@/components/themeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar />
          </>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
