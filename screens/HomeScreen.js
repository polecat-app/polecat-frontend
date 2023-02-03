import { createStackNavigator } from '@react-navigation/stack';
import Animal from '../components/Animal';
import AnimalList from '../components/AnimalList';
import Map from '../components/Map';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AnimalList" component={AnimalList} options={{ headerShown: false }}/>
      <Stack.Screen name="Map" component={Map} options={{ headerShown: false }}/>
      <Stack.Screen name="Animal" component={Animal} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HomeScreen