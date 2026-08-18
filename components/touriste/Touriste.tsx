import { useTheme } from "@/components/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import TouristFormModal from "./TouristFormModal";
import TouristRow from "./TouristRow";
import { Tourist } from "./types";
import { useTourists } from "./useTourists";
const Touriste = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTourist, setEditingTourist] = useState<Tourist | null>(null);
  const {
    tourists,
    isLoading,
    isRefreshing,
    isSaving,
    errorMessage,
    setErrorMessage,
    loadTourists,
    saveTourist,
    deleteTourist,
  } = useTourists();

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingTourist(null);
  };

  const handleDelete = (tourist: Tourist) => {
    Alert.alert(
      t("tourists.deleteTitle"),
      t("tourists.deleteDescription", { name: tourist.name }),
      [
        { text: t("tourists.cancel"), style: "cancel" },
        {
          text: t("tourists.delete"),
          style: "destructive",
          onPress: () => deleteTourist(tourist),
        },
      ],
    );
  };

  const handleSave = async (touristData: { name: string; email: string }) => {
    const saved = await saveTourist(editingTourist, touristData);
    if (saved) closeForm();
  };

  return (
    <View style={styles.content}>
      <View style={styles.toolbar}>
        <Text style={[styles.count, { color: colors.textMuted }]}>
          {tourists.length}{" "}
          {tourists.length === 1 ? t("tourists.one") : t("tourists.many")}
        </Text>
        <Pressable
          onPress={() => {
            setEditingTourist(null);
            setIsFormVisible(true);
          }}
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="add" size={20} color={colors.onPrimary} />
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            {t("tourists.add")}
          </Text>
        </Pressable>
      </View>

      {errorMessage && (
        <View style={[styles.errorBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.errorText, { color: colors.text }]}>
            {errorMessage}
          </Text>
          <Pressable
            onPress={() => setErrorMessage(null)}
            accessibilityLabel="Fermer le message"
          >
            <Text style={[styles.closeError, { color: colors.textMuted }]}>
              X
            </Text>
          </Pressable>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={tourists}
          keyExtractor={(tourist) => String(tourist.id)}
          contentContainerStyle={
            tourists.length ? styles.list : styles.emptyList
          }
          refreshing={isRefreshing}
          onRefresh={() => loadTourists(true)}
          ListEmptyComponent={
            <View
              style={[styles.emptyState, { backgroundColor: colors.surface }]}
            >
              <Ionicons
                name="people-outline"
                size={42}
                color={colors.textMuted}
              />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                {t("tourists.emptyTitle")}
              </Text>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("tourists.emptyDescription")}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouristRow
              tourist={item}
              onEdit={(selectedTourist) => {
                setEditingTourist(selectedTourist);
                setIsFormVisible(true);
              }}
              onDelete={handleDelete}
            />
          )}
        />
      )}

      <TouristFormModal
        visible={isFormVisible}
        tourist={editingTourist}
        isSaving={isSaving}
        onClose={closeForm}
        onSubmit={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1 },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  count: { fontSize: 15, fontWeight: "600" },
  addButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  buttonText: { fontSize: 15, fontWeight: "600" },
  errorBox: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: { flex: 1, fontSize: 14, marginRight: 10 },
  closeError: { fontSize: 18, fontWeight: "700", padding: 4 },
  loader: { marginTop: 40 },
  list: { paddingBottom: 24, gap: 10 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
  emptyState: { alignItems: "center", padding: 28, borderRadius: 16 },
  emptyTitle: { fontSize: 18, fontWeight: "700", marginTop: 12 },
  emptyText: { fontSize: 14, marginTop: 5 },
});

export default Touriste;
