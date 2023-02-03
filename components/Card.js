import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Image } from "react-native";
import cardStyle from "../styles/CardStyle";

function AnimalCard(props) {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Animal', props)
        }}
      >
        <View style={cardStyle.cardContainer}>
          <View style={cardStyle.textContainer}>
            <Text style={cardStyle.commonName} numberOfLines={1}>
              {props.commonName}
            </Text>
            <Text style={cardStyle.binomial} numberOfLines={1}>
              {props.binomial}
            </Text>
            <Text style={cardStyle.summary} numberOfLines={2}>
              {props.summary}
            </Text>
          </View>
          <View style={cardStyle.imageContainer}>
            <Image style={cardStyle.image} source={{ uri: props.image }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default AnimalCard;
