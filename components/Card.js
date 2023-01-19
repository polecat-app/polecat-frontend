import { TouchableOpacity, View, Text, Image } from "react-native";
import cardStyle from "../styles/CardStyle"


function AnimalCard(props) {
  return (
    <View>
    <TouchableOpacity onPress={() => {props.setShowAnimal(true); props.setAnimalProps(props)} }>
    <View style={cardStyle.cardContainer}>
      <View style={cardStyle.textContainer}>
        <Text style={cardStyle.commonName}>
        {props.commonName}
        </Text>
        <Text style={cardStyle.binomial}>
          {props.binomial}
        </Text>
        <Text style={cardStyle.summary} numberOfLines={2}>
        {props.summary}
        </Text>
      </View>
      <View style={cardStyle.imageContainer}>
        <Image style={cardStyle.image} source={{uri: props.image}}/>
      </View>
    </View>
    </TouchableOpacity>
    </View>
    )
  }

export default AnimalCard
