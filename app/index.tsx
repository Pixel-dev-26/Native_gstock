import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import MediaBtn from "@/components/mediaBtn";
import TextCustomise from "@/components/textCustomise";
import { useTheme } from "@/components/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { colors, theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.themeToggleRow}>
            <Pressable
              onPress={toggleTheme}
              style={[styles.themeButton, { backgroundColor: colors.surface }]}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Ionicons
                  name={isLight ? "moon" : "sunny"}
                  size={20}
                  color={isLight ? "#333" : "#fff"}
                />
                <TextCustomise typeText="normal">
                  {isLight ? "Dark" : "Light"} mode
                </TextCustomise>
              </View>
            </Pressable>
          </View>

          <View style={styles.firstChild}>
            <View
              style={{
                gap: 26,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/logo.svg")}
                style={styles.logo}
              />
              <Header
                title="Welcome Back"
                txt="Sign in to access your secure workspace"
              />
            </View>
            <View style={styles.inputGroup}>
              <View style={{ gap: 16 }}>
                <View>
                  <TextCustomise typeText="normal">Email Address</TextCustomise>
                  <Input
                    imageSrc={require("@/assets/images/mail.svg")}
                    placeholder="sarah.chen@design.co"
                  />
                </View>
                <View>
                  <TextCustomise typeText="normal">Password</TextCustomise>
                  <Input
                    imageSrc={require("@/assets/images/lock.svg")}
                    placeholder="password"
                  />
                </View>
              </View>
              <Link
                href={"/"}
                style={{ color: colors.primary, textAlign: "right" }}
              >
                <TextCustomise typeText="normal">
                  Forgot password?
                </TextCustomise>
              </Link>
            </View>
            <View style={styles.card3}>
              <Button
                txt="Log In"
                onPress={() => {
                  router.push("/auth");
                }}
              />
              <View style={styles.LineCard}>
                <View style={[styles.line, { backgroundColor: colors.line }]} />
                <TextCustomise
                  typeText="default"
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  or continue with
                </TextCustomise>
                <View style={[styles.line, { backgroundColor: colors.line }]} />
              </View>
              <View style={styles.mediaLogin}>
                <MediaBtn
                  txt="Google"
                  imgsrc={require("@/assets/images/google.svg")}
                />
                <MediaBtn
                  txt="Apple"
                  imgsrc={require("@/assets/images/apple.svg")}
                />
              </View>
            </View>
          </View>

          <View style={styles.secondChild}>
            <TextCustomise typeText="txtMedium">
              Don&apos;t have an account?
            </TextCustomise>
            <Link href={"/auth"} style={{ color: colors.primary }}>
              <TextCustomise typeText="txtBack"> Sign up</TextCustomise>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  themeToggleRow: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 18,
    paddingTop: 18,
  },
  themeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  firstChild: {
    width: 346,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  inputGroup: {
    minHeight: 200,
    justifyContent: "space-between",
  },
  secondChild: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    marginBottom: 16,
  },
  logo: {
    width: 59.92,
    height: 59.92,
  },
  card3: {
    gap: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  LineCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  line: {
    width: 98.5,
    height: 2,
  },
  mediaLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
