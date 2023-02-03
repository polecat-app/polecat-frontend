import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import useLocation from "../hooks/useLocation";


function LocationPicker() {

  const [pickedLocation, setPickedLocation] = useState(null)
  const navigation = useNavigation()

  const location = useLocation()
  console.log(location)

  function pickOnMapHandler() {
    navigation.navigate('Map', {pickedLocation})
  }

  return (
    <TouchableOpacity onPress={pickOnMapHandler} style={{flex:1, width:'100%'}}>
      <Text>{location? 'some location' : 'Loading location...'}</Text>
      <Ionicons name="ios-map" size={15} color={'white'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%'
  }
})

export default LocationPicker