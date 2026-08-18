import { useTheme } from "@/components/themeProvider";
import Touriste from "@/components/touriste";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.appBar}>
        <View style={styles.appBarTitle}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("dashboard.title")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {user?.email ?? t("dashboard.userFallback")}
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Se déconnecter"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.appBarSpacer} />
      </View>

      <Touriste />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  appBar: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  appBarTitle: { flex: 1, alignItems: "center" },
  appBarSpacer: { width: 10 },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 12, marginTop: 3 },
});
