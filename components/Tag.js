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
  endangered: ["lightcoral", "exclamation-thick"],
};

const SavedTags = {
  liked: [Colors.AccentTertiary, "heart"],
  seen: [Colors.AccentSecondary, "check"],
};

const Tags = { ...SpeciesTags, ...OccuranceTags, ...SavedTags };

function Tag({ tag, onlyIcon = false }) {
  const [color, icon] = Tags[tag];

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {!onlyIcon && (
        <Text
          style={[
            textStyles.basicAccentBold,
            { marginHorizontal: 7, marginVertical: 2 },
          ]}
        >
          {tag}
        </Text>
      )}
      <MaterialCommunityIcons
        name={icon}
        size={12}
        color={Colors.AccentIcon}
        style={{ margin: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginRight: 7,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Tag;
export { SpeciesTags, OccuranceTags };
