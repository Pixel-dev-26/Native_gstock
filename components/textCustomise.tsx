import { StyleSheet, Text, TextStyle, View } from "react-native";

type TextCustomiseProps = {
  typeText: "h1" | "paragraph" | "txtBack" | "txtMedium" | "normal" | "default";
  children: React.ReactNode;
  style?: TextStyle;
};

const TextCustomise: React.FC<TextCustomiseProps> = ({
  typeText,
  children,
  style,
}) => {
  return (
    <View>
      <Text style={[styles[typeText], style]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 29,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 16.05,
    fontWeight: "regular",
  },
  txtBack: {
    fontSize: 14,
    fontWeight: "semibold",
  },
  txtMedium: {
    fontSize: 14,
    fontWeight: "medium",
  },
  normal: {
    fontSize: 13,
    fontWeight: "semibold",
  },
  default: {
    fontSize: 12,
    fontWeight: "medium",
  },
});
export default TextCustomise;
