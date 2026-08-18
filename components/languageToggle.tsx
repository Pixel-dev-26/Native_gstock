import { useTheme } from "@/components/themeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LanguageToggle() {
  const { colors } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const nextLanguage = language === "fr" ? "en" : "fr";

  return (
    <Pressable
      accessibilityLabel={
        language === "fr" ? t("common.english") : t("common.french")
      }
      onPress={() => void setLanguage(nextLanguage)}
      style={[styles.button, { backgroundColor: colors.surface }]}
    >
      <View style={styles.content}>
        <Ionicons name="language-outline" size={18} color={colors.text} />
        <Text style={[styles.label, { color: colors.text }]}>
          {language.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  content: { flexDirection: "row", alignItems: "center", gap: 6 },
  label: { fontSize: 13, fontWeight: "600" },
});
