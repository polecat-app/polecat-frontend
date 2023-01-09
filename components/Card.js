import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import AnimalModal from "./AnimalModal";


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
    <View style={styles.cardContainer}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.commonName}>
        {props.commonName}
        </Text>
        <Text style={styles.binomial}>
          {props.binomial}
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
        {props.summary}
        </Text>
      </View>
      <Image style={styles.image} source={{uri: props.image}}/>
    </View>
    </TouchableOpacity>
    </View>
    )
  }

export default AnimalCard

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'beige',
    borderRadius: 20,
    padding: 10,
    height: 100,
  },
  cardTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 80,
  },
  // Text styling can be defined outside stylesheet object,
  // but within object VScode will autocomplete
  commonName: {
    fontWeight: 'bold'
  },
  binomial: {
    fontStyle: 'italic',
    color: 'grey'
  },
  summary: {
    flex: 0,
    fontWeight: "300",
  },
  image: {
    resizeMode: "cover",
    height: 80,
    width: 80,
    borderRadius: 40,
  }
});
  