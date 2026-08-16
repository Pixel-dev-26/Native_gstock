import { StyleSheet, View } from "react-native";
import TextCustomise from "./textCustomise";

interface TextHeaderProps {
  title: string;
  txt: string;
}

const Header: React.FC<TextHeaderProps> = ({ title, txt }) => {
  return (
    <View style={styles.container}>
      <TextCustomise typeText="h1" style={styles.txt}>
        {title}
      </TextCustomise>
      <TextCustomise typeText="paragraph" style={styles.txt}>
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
