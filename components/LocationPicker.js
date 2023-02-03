import { Pressable, StyleSheet, Text } from "react-native"
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
    <Pressable onPress={pickOnMapHandler}>
      <Text>{location? 'some location' : 'Loading location...'}</Text>
      <Ionicons name="ios-map" size={15} color={'white'} />
    </Pressable>
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