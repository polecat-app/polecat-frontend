import { Pressable, StyleSheet, Text, Alert, Image, View } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useState } from "react";
import getMapPreview from "../util/location";


function LocationPicker() {

  const [pickedLocation, setPickedLocation] = useState(null)

  const [
    locationPermissionInformation, 
    requestPermission
  ] = useForegroundPermissions()
  
  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('You need to grant location permissions to find local wildlife.')
      return false
    }
    return true
  }
  

  async function getLocationHandler() {
    console.log('pressed')
    const hasPermission = await verifyPermissions()
    console.log('permission', hasPermission)
    if (!hasPermission) { return }
    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
    console.log('location', location)
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location picked yet.</Text>

  if (pickedLocation) {
    console.log('picked location', pickedLocation)
    console.log('getmappreview')
    const uri = getMapPreview(pickedLocation.lat, pickedLocation.lng)
    console.log(uri)
    locationPreview = (
      <Image 
        style={styles.mapPreviewImage} 
        source={{
          uri: uri
        }}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <Pressable onPress={getLocationHandler}>
          <Text>Get location</Text>
          <Ionicons name="ios-location" size={15} color={'white'} />
        </Pressable>
        <Pressable onPress={pickOnMapHandler}>
          <Text>Pick on map</Text>
          <Ionicons name="ios-map" size={15} color={'white'} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 8,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 5
  },
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