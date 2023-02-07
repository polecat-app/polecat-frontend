import { createStackNavigator } from '@react-navigation/stack';
import Animal from '../components/Animal';
import SearchComponent from '../components/SearchComponent';

const Stack = createStackNavigator();

function SearchScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchComponent" component={SearchComponent} options={{ headerShown: false }}/>
      <Stack.Screen name="Animal" component={Animal} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default SearchScreen