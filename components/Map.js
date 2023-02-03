import { useLayoutEffect, useState } from "react";
import { Alert, Pressable, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native"


function Map() {
  const [selectedLocation, setSelectedLocation] = useState();
  const navigation = useNavigation()

  const region = {
    latitude: 52,
    longitude: 12,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude: lat, longitude: lng });
  }

  function savePickedLocationHandler() {
    if (!selectedLocation) {
      Alert.alert('No location picked! Click the map to pick location.')
      return
    }
    navigation.navigate('AnimalList', {selectedLocation})
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({})
    })
  })

  return (
    <View style={{flexDirection:'column', flex:1}}>
      <MapView
        initialRegion={region}
        style={{ width: "100%", flex: 1 }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker title="Picked location" coordinate={selectedLocation} />
        )}
      </MapView>
      <Pressable onPress={savePickedLocationHandler} style={{width: "100%", flex: 1, backgroundColor: 'teal'}}>
        <Text>Save location</Text>
      </Pressable>
    </View>
  );
}

export default Map;
