import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";

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
  }
  const mapRef = useRef(null);

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
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.03,
    });
  }

  return (
    <View style={{ flexDirection: "column", flex: 1, alignItems: "center"}}>

      <MapView
        ref={mapRef}
        region={region}
        style={{ width: "100%", flex: 3 }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker title="location" coordinate={selectedLocation} />
        )}
      </MapView>

      {/* Elements on Map */}
      <TouchableOpacity 
      onPress={() => navigation.navigate("AnimalList")}
      style={styles.closeButton}
      >
        <Ionicons
          name={"arrow-back-outline"}
          size={32}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <View style={styles.hint}>
        <Text style={textStyles.basic}> Pick a location on the map. </Text>
      </View>

      {/* Elements below map */}
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={useCurrentLocationHandler}
          style={styles.buttonCurrentLocation}
        >
          <Text style={textStyles.basic}>Navigate to current location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={savePickedLocationHandler}
          style={styles.buttonConfirm}
        >
          <Text style={textStyles.basicAccentBold}>Confirm location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: Colors.Primary,
    width: '100%',
    height: 160,
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin
  },
  buttonCurrentLocation: {
    width: "100%",
    flex: 1,
    backgroundColor: Colors.Secondary,
    margin: Offsets.DefaultMargin,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Offsets.BorderRadius
  },
  buttonConfirm: {
    width: "100%",
    flex: 1,
    backgroundColor: Colors.AccentPrimary,
    margin: Offsets.DefaultMargin,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Offsets.BorderRadius
  },
  closeIcon: {
    color: Colors.AccentIcon,
    opacity: 0.8,
  },
  closeButton: {
    position: "absolute",
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: Offsets.DefaultMargin,
    zIndex: 5,
  },
  hint: {
    position: "absolute",
    marginTop: 30,
    zIndex: 4,
    backgroundColor: Colors.Primary,
    padding: Offsets.DefaultMargin,
    borderRadius: Offsets.BorderRadius,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
  },
});
