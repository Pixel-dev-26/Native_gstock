import Button from "@/components/button";
import Header from "@/components/header";
import Input from "@/components/input";
import TextCustomise from "@/components/textCustomise";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
        <View style={styles.card}>
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
          <TextCustomise
            typeText="normal"
            style={{ color: "#4F46E5", textAlign: "right" }}
          >
            Forgot password?
          </TextCustomise>
        </View>
        <View style={[styles.card, { gap: 24 }]}>
          <Button txt="Log In" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logo: {
    width: 59.92,
    height: 59.92,
  },
  card: {
    height: 200,
  },
});
