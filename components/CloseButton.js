import { Pressable, StyleSheet, Text } from "react-native";
import textStyles from "../styles/TextStyles";

function CloseButton({ closeFunction }) {
  return (
    <Pressable
      style={styles.closeButton}
      onPress={() => {
        closeFunction();
      }}
    >
      <Text style={textStyles.basicAccentBold}>Close</Text>
    </Pressable>
  );
}

export default CloseButton;

const styles = StyleSheet.create({
  closeButton: {
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
  },
});
