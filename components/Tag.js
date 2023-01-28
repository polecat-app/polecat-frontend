import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
    <View
      style={{
        borderRadius: 10,
        backgroundColor: color,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          marginLeft: 5,
          marginRight: 5,
        }}
      >
        {props.tag}
      </Text>
      <MaterialCommunityIcons
        name={icon}
        size={12}
        color="white"
        style={{ marginRight: 5 }}
      />
    </View>
  );
}

export default Tag;
export { SpeciesTags, OccuranceTags };
