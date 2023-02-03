import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";

function AnimalCard(props) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {navigation.navigate("Animal", props)}}
      >
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
            <Text style={textStyles.basicBold} numberOfLines={1}>
              {props.commonName}
            </Text>
            <Text style={textStyles.basicItalic} numberOfLines={1}>
              {props.binomial}
            </Text>
            <Text style={textStyles.basic} numberOfLines={2}>
              {props.summary}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  image: {
    resizeMode: "cover",
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Offsets.BorderRadius,
    padding: Offsets.DefaultMargin,
    height: 100,
    marginTop: Offsets.DefaultMargin,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 3,
    height: 80,
    flex: 3,
  },
});

export default AnimalCard;
