import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

const { View, StyleSheet } = require("react-native");

function TopBarContainer(props) {
  return <View style={styles.barContainer}>{props.children}</View>;
}

export default TopBarContainer;

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: Colors.AccentPrimary,
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
    padding: Offsets.LargeMargin,
    paddingTOp: Offsets.LargeMargin * 2,
  },
  scrollViewContainer: {
    marginHorizontal: Offsets.DefaultMargin,
    flex: 10,
  },
});
