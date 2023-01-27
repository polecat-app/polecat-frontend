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
  <View style={{backgroundColor: 'white', flex:1, width:'100%'}}>

    {/* Background Image */}
    <ImageBackground style={modalStyle.image} source={{uri: props.image}}/>

    <View style={modalStyle.container}>

      {/* Elements on Image */}
      <View style={modalStyle.onImage}>
        <Pressable onPress={() => props.setShowAnimal(false)}>
          <Ionicons 
            name={"ios-close-circle"} 
            size={50} 
            style={modalStyle.close} />
        </Pressable>
        <Text 
          style={modalStyle.commonName} 
          numberOfLines={3}> 
          {props.commonName}
        </Text>
      </View>

      {/* Buttons */}
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
      </View>

      {/* Description Text */}
      <View style={modalStyle.titleText}>
        <Text style={cardStyle.binomial}> {props.binomial}</Text>
        <Text style={cardStyle.summary}>{props.summary}</Text>
      </View>
    
    </View>

  </View>
  );
};

const modalStyle = StyleSheet.create({
  commonName: {
    fontWeight: 'bold', 
    color:'white',
    fontSize: 25,
  },
  onImage: {
    height: 320,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    zIndex: 5,
    width:'100%',
    padding: 10
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
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    position: 'absolute',
    alignItems: 'stretch',
    width:'100%',
  },
  topBar: {
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
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
    opacity: 0.8,
    alignSelf: 'flex-end'
  },
})

export default Animal