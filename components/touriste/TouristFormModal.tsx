import { useTheme } from "@/components/themeProvider";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Tourist, TouristInput } from "./types";

type TouristFormModalProps = {
  visible: boolean;
  tourist: Tourist | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (tourist: TouristInput) => void;
};

export default function TouristFormModal({
  visible,
  tourist,
  isSaving,
  onClose,
  onSubmit,
}: TouristFormModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [name, setName] = useState(tourist?.name ?? "");
  const [email, setEmail] = useState(tourist?.email ?? "");

  useEffect(() => {
    if (visible) {
      setName(tourist?.name ?? "");
      setEmail(tourist?.email ?? "");
    }
  }, [tourist, visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.modal, { backgroundColor: colors.surface }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              {tourist ? t("tourists.editTitle") : t("tourists.newTitle")}
            </Text>
            <Pressable onPress={onClose} accessibilityLabel="Fermer">
              <Text style={[styles.close, { color: colors.textMuted }]}>X</Text>
            </Pressable>
          </View>
          <TextInput
            placeholder={t("tourists.fullName")}
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            autoCapitalize="words"
          />
          <TextInput
            placeholder={t("tourists.email")}
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border },
            ]}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Pressable
            onPress={() => onSubmit({ name: name.trim(), email: email.trim() })}
            disabled={isSaving}
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
          >
            {isSaving ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={[styles.saveText, { color: colors.onPrimary }]}>
                {t("common.save")}
              </Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modal: {
    padding: 22,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 21, fontWeight: "700" },
  close: { fontSize: 20, fontWeight: "600", padding: 4 },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  saveButton: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { fontSize: 15, fontWeight: "600" },
});
