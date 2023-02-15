import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Colors } from "../../styles/Colors";
import { Offsets } from "../../styles/Offsets";
import textStyles from "../../styles/TextStyles";
import getAddressFromCoordinates from "../../util/GetAddress";
import TopBarContainer from "../../components/TopBarContainer";

function MapScreen({ navigation, route }) {
  // States from parent component
  const pickedLocation = route.params.pickedLocation;
  const previousLocationName = route.params.locationName;

  // States
  const location = useLocation();
  const [locationName, setLocationName] = useState(previousLocationName);
  const [selectedLocation, setSelectedLocation] = useState(pickedLocation);
  const region = {
    latitude: pickedLocation.latitude,
    longitude: pickedLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  };
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
    navigation.navigate("List", { selectedLocation });
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

  // Get location name by reverse geocoding
  useEffect(() => {
    if (selectedLocation) {
      getAddressFromCoordinates({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        setLocationName: setLocationName,
      });
    }
  }, [selectedLocation]);

  return (
    <View style={styles.container}>

      {/* Map background */}
      <MapView
        ref={mapRef}
        region={region}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>

      {/* Top bar */}
      <View style={[styles.onMapTop, styles.shadow]}>
        <TopBarContainer backgroundColor={Colors.AccentSecondary}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("List")}>
              <Ionicons
                name={"arrow-back-outline"}
                size={32}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={textStyles.overlayBold}> Pick location</Text>
          </View>
          <View style={styles.row}>
            <Ionicons
              style={{ marginRight: 5 }}
              name="location"
              size={15}
              color={Colors.AccentIcon}
            />
            <Text style={textStyles.basicAccentBold}>{locationName}</Text>
          </View>
        </TopBarContainer>
      </View>

      {/* Bottom bar */}
      <View style={styles.onMapBottom}>
        <TouchableOpacity
          onPress={useCurrentLocationHandler}
          style={styles.buttonCurrentLocation}
        >
          <Ionicons name="navigate" size={32} color={Colors.Primary} />
        </TouchableOpacity>

        {/* Elements below map */}
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={savePickedLocationHandler}
            style={styles.buttonConfirm}
          >
            <Text style={textStyles.basicAccentBold}>Confirm location</Text>
          </TouchableOpacity>
        </View>
      </View>

      </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  onMapTop: {
    width: "100%",
    position: "absolute",
    zIndex: 5,
    top: 0,
  },
  onMapBottom: {
    width: "100%",
    position: "absolute",
    zIndex: 5,
    bottom: 0,
  },
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottom: {
    backgroundColor: Colors.Primary,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
  },
  buttonCurrentLocation: {
    alignSelf: "flex-end",
    marginBottom: Offsets.LargeMargin,
    marginRight: Offsets.LargeMargin,
    backgroundColor: "rgba(100,100,100,0.5)",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    zIndex: 8,
  },
  buttonConfirm: {
    padding: Offsets.DefaultMargin,
    width: "100%",
    backgroundColor: Colors.AccentSecondary,
    margin: Offsets.DefaultMargin,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Offsets.BorderRadius,
  },
  closeIcon: {
    color: Colors.AccentIcon,
  },
  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
  },
});
