import { Image } from "expo-image";
import React from "react";
import {
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface mediaBtnProps extends TouchableOpacityProps {
  txt: string;
  imgsrc?: ImageRequireSource;
}

const MediaBtn: React.FC<mediaBtnProps> = ({ txt, imgsrc, ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <View style={styles.container}>
        <Image source={imgsrc} style={styles.img} />
        <Text>{txt}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    width: 165,
    height: 52,
    borderWidth: 1,
    borderColor: "#222121",
    borderRadius: 28,
  },
  img: {
    width: 20,
    height: 20,
  },
});

export default MediaBtn;
