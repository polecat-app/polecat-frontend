import { View, StyleSheet } from "react-native";
import { Colors } from "../../styles/Colors";
import { Offsets } from "../../styles/Offsets";
import TextInput from "react-native-text-input-interactive";
import { IconTypes } from "../../util/Constants";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  iconType,
}) {
  let requirePath = null;
  if (iconType == IconTypes.email) {
    requirePath = require("../../assets/mail-outline.png");
  }
  if (iconType == IconTypes.password) {
    requirePath = require("../../assets/key-outline.png");
  }
  if (iconType == IconTypes.search) {
    requirePath = require("../../assets/search-outline.png");
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        textInputStyle={styles.inputfield}
        autoCapitalize={"none"}
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        mainColor={isInvalid ? Colors.AccentTertiary : Colors.AccentSecondary}
        enableIcon
        iconImageSource={requirePath}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.AccentTertiary,
  },
  inputfield: {
    borderRadius: Offsets.BorderRadius,
    flexDirection: "row",
    alignItems: "center",
    padding: Offsets.DefaultMargin,
    width: "100%",
    backgroundColor: Colors.Secondary,
  },
  inputInvalid: {
    backgroundColor: Colors.AccentTertiary,
  },
});
