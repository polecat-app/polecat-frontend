import { createStackNavigator } from "@react-navigation/stack";
import AnimalScreen from "./AnimalScreen";
import ListScreen from "./saved/ListScreen";

const Stack = createStackNavigator();

function SavedScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={ListScreen}
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

export default SavedScreen;
