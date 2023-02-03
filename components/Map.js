import { Pressable, View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function Map({ navigation, route }) {

  // States from parent component
  const pickedLocation = route.params.pickedLocation;

  // States
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(pickedLocation);

  const region = {
    latitude: pickedLocation.latitude,
    longitude: pickedLocation.longitude,
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
      Alert.alert("No location picked! Click the map to pick location.");
      return;
    }
    navigation.navigate("AnimalList", { selectedLocation });
  }

  function useCurrentLocationHandler() {
    const lat = location.latitude;
    const lng = location.longitude;
    setSelectedLocation({ latitude: lat, longitude: lng });
  }

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {/* Elements on Map */}
      <View style={modalStyle.onImage}>
        <Pressable onPress={() => navigation.navigate("AnimalList")}>
          <Ionicons
            name={"arrow-back-outline"}
            size={32}
            style={modalStyle.close}
          />
        </Pressable>
      </View>

      <MapView
        initialRegion={region}
        style={{ width: "100%", flex: 3 }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker title="Picked location" coordinate={selectedLocation} />
        )}
      </MapView>
      <Pressable
        onPress={savePickedLocationHandler}
        style={{ width: "100%", flex: 1, backgroundColor: "teal" }}
      >
        <Text>Save location</Text>
      </Pressable>
      <Pressable
        onPress={useCurrentLocationHandler}
        style={{ width: "100%", flex: 1, backgroundColor: "teal" }}
      >
        <Text>Use current location</Text>
      </Pressable>
    </View>
  );
}

export default Map;

const modalStyle = StyleSheet.create({
  onImage: {
    height: 100,
    justifyContent: "space-between",
    flexDirection: "column",
    zIndex: 5,
    padding: 10,
  },
  close: {
    marginRight: 10,
    marginTop: 10,
    color: "white",
    opacity: 0.8,
    alignSelf: "flex-start",
  },
});
