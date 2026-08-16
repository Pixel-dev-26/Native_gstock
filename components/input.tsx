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
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={imageSrc} style={styles.image} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
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
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
  },
});

export default Input;
