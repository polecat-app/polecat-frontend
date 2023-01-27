import { StyleSheet, Text, Pressable, View, Image, Button, ImageBackground } from "react-native";
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

  console.log(props.navigate)


  return (
  <View style={modalStyle.modalView}>

    {/* Top bar */}
    <View style={modalStyle.topBar}>
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
      <Pressable onPress={() => props.setShowAnimal(false)}>
            <Ionicons 
              name={"ios-close-circle"} 
              size={32} 
              style={modalStyle.close} />
      </Pressable>
    </View>

    {/* Image */}
    <ImageBackground style={modalStyle.image} source={{uri: props.image}}/>


    {/* Text */}
    <Text style={modalStyle.commonName} numberOfLines={3}> {props.commonName}</Text>

    <View style={modalStyle.titleText}>
      <Text style={cardStyle.binomial}> {props.binomial}</Text>
      <Text style={cardStyle.summary}>{props.summary}</Text>
    </View>

  </View>
  );
};

const modalStyle = StyleSheet.create({
  commonName: {
    marginLeft: 10,
    fontWeight: 'bold', 
    color:'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 300,
    marginBottom: 10,
    fontSize: 25
  },
  image: {
    height: 320,
    width: '100%',
    justifyContent: 'center',
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
    backgroundColor: "white",
  },
  topBar: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 3,
    flex:1,
  },
  seenUnselected: {
    color: 'white',
    opacity: 0.8,
  },
  seenSelected: {
    color: '#B2FFE4',
  },
  loveUnselected: {
    color: 'white',
    opacity: 0.8,
  },
  loveSelected: {
    color: 'red',
  },
  close: {
    color: 'white',
    opacity: 0.8,
  },
})

export default Animal