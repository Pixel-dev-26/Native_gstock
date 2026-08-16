import { useTheme } from "@/components/themeProvider";
import { StyleSheet, View } from "react-native";
import TextCustomise from "./textCustomise";

interface TextHeaderProps {
  title: string;
  txt: string;
}

const Header: React.FC<TextHeaderProps> = ({ title, txt }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TextCustomise typeText="h1" style={[styles.txt, { color: colors.text }]}>
        {title}
      </TextCustomise>
      <TextCustomise
        typeText="paragraph"
        style={[styles.txt, { color: colors.textMuted }]}
      >
        {txt}
      </TextCustomise>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  txt: {
    textAlign: "center",
  },
});

export default Header;
