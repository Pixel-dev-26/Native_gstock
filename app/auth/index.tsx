import { useTheme } from "@/components/themeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.text, { color: colors.text }]}>Auth page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Index;
