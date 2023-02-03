import * as Location from "expo-location";
import { useEffect, useState } from "react";

function useLocation() {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        /* Change the code below this comment */
        const lastKnownPosition = await Location.getLastKnownPositionAsync();
        if (!lastKnownPosition) {
            return;
        }
        const { latitude, longitude } = lastKnownPosition.coords;
        setLocation({ latitude, longitude });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return location;
};

export default useLocation