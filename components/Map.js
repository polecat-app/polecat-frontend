import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

function Map() {
  const [selectedLocation, setSelectedLocation] = useState();

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

  return (
    <MapView
      initialRegion={region}
      style={{ width: "100%", flex: 1 }}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

export default Map;
