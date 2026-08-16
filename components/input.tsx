import { useTheme } from "@/components/themeProvider";
import { Image } from "expo-image";
import {
  ImageRequireSource,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
  imageSrc: ImageRequireSource;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  imageSrc,
  containerStyle,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBg,
          borderColor: colors.inputBorder,
        },
        containerStyle,
      ]}
    >
      <Image source={imageSrc} style={styles.image} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, { color: colors.text }]}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 342,
    height: 52,
    paddingHorizontal: 20,
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    marginVertical: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: "80%",
  },
});

export default Input;
