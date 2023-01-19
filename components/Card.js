import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import AnimalModal from "./AnimalModal";
import cardStyle from "../styles/CardStyle"


function AnimalCard(props) {

  // Show modal
  const [showModal, setShowModal] = useState(false);
  function onClickAnimal() {
    setShowModal(true)
  }
  function onCloseModal() {
    setShowModal(false)
  }

  return (
    <View>
      <AnimalModal showModal={showModal} onCloseModal={onCloseModal} {...props}/>
    <TouchableOpacity onPress={() => setShowModal(true)}>
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
