import { useTheme } from "@/components/themeProvider";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface BtnProps extends TouchableOpacityProps {
  txt: string;
}

const Button: React.FC<BtnProps> = ({ txt, style, ...rest }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: colors.primary }, style]}
      {...rest}
    >
      <Text style={[styles.txtbtn, { color: colors.onPrimary }]}>{txt}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  txtbtn: {
    fontSize: 15,
    fontWeight: "semibold",
  },
});

export default Button;
