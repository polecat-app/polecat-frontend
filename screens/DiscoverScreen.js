import { createStackNavigator } from "@react-navigation/stack";
import AnimalScreen from "./AnimalScreen";
import ListScreen from "./discover/ListScreen";
import MapScreen from "./discover/MapScreen";

const Stack = createStackNavigator();

function DiscoverScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Animal"
        component={AnimalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DiscoverScreen;
