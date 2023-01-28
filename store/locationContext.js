import { useForegroundPermissions } from "expo-location";
import React, { useState,useEffect } from "react";
import { Alert } from "react-native"
import { getCurrentPositionAsync, PermissionStatus } from "expo-location"


const LocationContext = React.createContext({})


function LocationProvider({children}) {

  // Set location state
  const [location, setLocation] = useState({
      "coords": {
        "accuracy": 30, 
        "altitude": 0, 
        "altitudeAccuracy": 10, 
        "heading": -1, 
        "latitude": 52, 
        "longitude": 5, 
        "speed": -1
      }, 
      "timestamp": 1111111111111.0
  });
  const [loading, setLoading] = useState(false);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

  // Verify user location permissions
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
  
  // Get location if permission granted
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const location = await getCurrentPositionAsync()
    return location
  }

  // Get location wrapper function that sets loading and location state
  async function getLocation() {
    setLoading(true)
    const newLocation = await getLocationHandler();
    if (newLocation) {
      setLocation(newLocation)
      setLoading(false)
    }
  }

  // Use effect to re initialize location on app reload
  useEffect(()=> {
    console.log('getting location')
    getLocation()
  },[])

  // Return context provider with loading and location state 
  return (
    <LocationContext.Provider value={{loading, location:location}}>
      {children}
    </LocationContext.Provider>
  )
}

export { LocationProvider, LocationContext}