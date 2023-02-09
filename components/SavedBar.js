import { View, StyleSheet, Text } from "react-native"
import { Colors } from "../styles/Colors"
import { Offsets } from "../styles/Offsets"

function SavedBar(props) {
  return (
    <View style={styles.background}>
      <Text>Saved bar</Text>
    </View>
  )
}

export default SavedBar

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.AccentPrimary,
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
    padding: Offsets.LargeMargin
  },})