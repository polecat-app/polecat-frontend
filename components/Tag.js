import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";

const SpeciesTags = {
  bird: ["coral", "bird"],
  reptile: ["limegreen", "snake"],
  mammal: ["peru", "pig-variant"],
  amphibian: ["darkturquoise", "turtle"],
};

const OccuranceTags = {
  common: ["darkgray", "circle"],
  uncommon: ["rosybrown", "record-circle"],
  rare: ["gold", "record-circle-outline"],
  endangered: ["red", "exclamation-thick"],
};

const Tags = { ...SpeciesTags, ...OccuranceTags };

function Tag(props) {
  const [color, icon] = Tags[props.tag];

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text
        style={[
          textStyles.basicAccentBold,
          { marginHorizontal: 7, marginVertical: 2 },
        ]}
      >
        {props.tag}
      </Text>
      <MaterialCommunityIcons
        name={icon}
        size={12}
        color={Colors.AccentIcon}
        style={{ marginRight: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginRight: Offsets.DefaultMargin,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Tag;
export { SpeciesTags, OccuranceTags };
