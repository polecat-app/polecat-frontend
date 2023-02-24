import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../styles/Colors';
import { Offsets } from '../../styles/Offsets';


function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.inputfield, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    width: "100%"
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.AccentTertiary,
  },
  inputfield: {
    width: "100%",
    borderRadius: Offsets.BorderRadius,
    backgroundColor: Colors.AccentSecondary,
    flexDirection: "row",
    alignItems: "center",
    padding: Offsets.DefaultMargin,
  },
  inputInvalid: {
    backgroundColor: Colors.AccentTertiary,
  },
});
