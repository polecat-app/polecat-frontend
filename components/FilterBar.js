import { Alert, StyleSheet, View, Text } from "react-native"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import { useEffect, useState } from "react"



function FilterBar() {

  const [location, setLocation] = useState({})

  // Get location
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

  async function verifyPermissions() {
    if (locationPermissionInformation === null) {
      return false
    }
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('You need to grant location permissions to find local wildlife.')
      return false
    }
    if (locationPermissionInformation.status === PermissionStatus.GRANTED) {
      return true
    }
    return false
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }
    const location = await getCurrentPositionAsync()
    setLocation(location)

  }
  
  useEffect(() => {
    getLocationHandler()
  }, [])

  return (
    <View style={{padding: 20, height: 150, backgroundColor: 'teal', justifyContent: 'space-around', flexDirection: 'column'}}>
      <Text 
        style={{color: 'white', flex:1, fontSize: 25}} 
        numberOfLines={1}>
      {location.timestamp}
      </Text>
    </View>
  )
}

export default FilterBar