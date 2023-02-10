import { View, StyleSheet, Text } from "react-native"
import { Colors } from "../styles/Colors"
import { Offsets } from "../styles/Offsets"

function SavedBar(props) {
  return (
    <View style={styles.row}>
      <Text>Saved bar</Text>
    </View>
  )
}

export default SavedBar

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },})