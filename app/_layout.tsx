import { ThemeProvider } from "@/components/themeProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar />
      </>
    </ThemeProvider>
  );
}
