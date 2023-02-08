import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";

function AnimalCardSmall(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(
          "Animal",
          (props = {
            ...props,
            image: "",
            tags: ["bird", "common"],
            summary: "Some summary.",
          })
        );
      }}
    >
      <Text style={textStyles.basicBold} numberOfLines={1}>
        {props.commonName}
      </Text>
      <Text style={textStyles.basicItalic} numberOfLines={1}>
        {props.binomial}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: Colors.Primary,
    borderRadius: Offsets.BorderRadius,
    padding: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin,
  },
});

export default AnimalCardSmall;
