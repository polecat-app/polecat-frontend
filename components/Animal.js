import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import cardStyle from "../styles/CardStyle";
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react";

function Animal(props) {

  const [seen, setSeen] = useState(false)
  const [love, setlove] = useState(false)
  function toggleSeen() {
    setSeen(!seen)
  }
  function toggleLove() {
    setlove(!love)
  }

  return (
  <View style={modalStyle.modalView}>

    {/* Image */}
    <View style={{backgroundColor:'black'}}>
      <Image style={modalStyle.image} source={{uri: props.image}}/>
    </View>

    {/* Text */}
    <View style={modalStyle.titleText}>
      <Text style={cardStyle.commonName}>{props.commonName}</Text>
      <Text style={cardStyle.binomial}>{props.binomial}</Text>
      <Text style={cardStyle.summary}>{props.summary}</Text>
    </View>

    {/* Bottom bar */}
    <View style={modalStyle.bottomBar}>
      <Pressable onPress={() => toggleSeen()}>
        <Ionicons 
          name={seen? "eye" : "eye-outline"} 
          size={32} 
          style={seen? modalStyle.seenSelected : modalStyle.seenUnselected} />
      </Pressable>
      <Pressable onPress={() => toggleLove()}>
        <Ionicons 
          name={love? "heart" : "heart-outline"} 
          size={32} 
          style={love? modalStyle.loveSelected : modalStyle.loveUnselected} />
      </Pressable>
      <Pressable
        style={[modalStyle.button, modalStyle.buttonClose]}
        onPress={() => props.setShowAnimal(false)}
      >
        <Text style={modalStyle.textStyle}>Close</Text>
      </Pressable>
    </View>

  </View>
  );
};

const modalStyle = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 260,
    width: '100%',
  },
  titleText: {
    padding: 10,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "teal",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  bottomBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  seenUnselected: {
    color: '#aaa',
  },
  seenSelected: {
    color: 'teal',
  },
  loveUnselected: {
    color: '#aaa',
  },
  loveSelected: {
    color: 'red',
  },
})

export default Animal