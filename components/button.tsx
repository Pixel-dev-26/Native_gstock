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

const Button: React.FC<BtnProps> = ({ txt, ...rest }) => {
  return (
    <TouchableOpacity style={styles.btn} {...rest}>
      <Text style={styles.txtbtn}>{txt}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 28,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  txtbtn: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "#fff",
  },
});

export default Button;
