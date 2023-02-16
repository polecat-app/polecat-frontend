import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

const { View, StyleSheet } = require("react-native");

function TopBarContainer(props) {
  const bg = props.backgroundColor? props.backgroundColor : Colors.AccentPrimary
  return <View style={[styles.barContainer, {backgroundColor: bg}]}>{props.children}</View>;
}

export default TopBarContainer;

const styles = StyleSheet.create({
  barContainer: {
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
    padding: Offsets.LargeMargin,
    paddingTOp: Offsets.LargeMargin * 2,
  },
});
