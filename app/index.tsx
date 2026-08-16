import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import MediaBtn from "@/components/mediaBtn";
import TextCustomise from "@/components/textCustomise";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstChild}>
        <View
          style={{ gap: 26, justifyContent: "center", alignItems: "center" }}
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
        <View style={{ height: 200 }}>
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
          <Link href={"/"} style={{ color: "#4F46E5", textAlign: "right" }}>
            <TextCustomise typeText="normal">Forgot password?</TextCustomise>
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
            <View style={styles.line} />
            <TextCustomise
              typeText="default"
              style={{ textAlign: "center", textTransform: "uppercase" }}
            >
              or continue with
            </TextCustomise>
            <View style={styles.line} />
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
        <Link href={"/auth"} style={{ color: "#4F46E5" }}>
          <TextCustomise typeText="txtBack"> Sign up</TextCustomise>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstChild: {
    width: 346,
    height: 655.15,
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  secondChild: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    marginBottom: 30,
  },
  logo: {
    width: 59.92,
    height: 59.92,
  },
  card3: {
    height: 171,
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
    backgroundColor: "#E4E4E7",
  },
  mediaLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});
