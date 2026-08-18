import { useTheme } from "@/components/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Tourist } from "./types";

type TouristRowProps = {
  tourist: Tourist;
  onEdit: (tourist: Tourist) => void;
  onDelete: (tourist: Tourist) => void;
};

export default function TouristRow({
  tourist,
  onEdit,
  onDelete,
}: TouristRowProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
        <Text style={[styles.avatarText, { color: colors.primary }]}>
          {tourist.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>
          {tourist.name}
        </Text>
        <Text style={[styles.email, { color: colors.textMuted }]}>
          {tourist.email}
        </Text>
      </View>
      <Pressable
        accessibilityLabel={`Modifier ${tourist.name}`}
        onPress={() => onEdit(tourist)}
        style={styles.action}
      >
        <Ionicons name="pencil-outline" size={20} color={colors.primary} />
      </Pressable>
      <Pressable
        accessibilityLabel={`Supprimer ${tourist.name}`}
        onPress={() => onDelete(tourist)}
        style={styles.action}
      >
        <Ionicons name="trash-outline" size={20} color="#DC2626" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 76,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontSize: 18, fontWeight: "700" },
  info: { flex: 1, marginHorizontal: 12 },
  name: { fontSize: 16, fontWeight: "700" },
  email: { fontSize: 13, marginTop: 4 },
  action: { padding: 8 },
});
