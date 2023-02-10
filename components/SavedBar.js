import { View, StyleSheet, Text } from "react-native"
import { Colors } from "../styles/Colors"
import { Offsets } from "../styles/Offsets"
import { Bars } from "../util/Constants"
import CloseButton from "./CloseButton"

function SavedBar(props) {
  return (
    <View style={styles.row}>
      <CloseButton closeFunction={() => {props.setSelectedBar(Bars.FilterBar);}}/>
    </View>
  )
}

export default SavedBar

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },})