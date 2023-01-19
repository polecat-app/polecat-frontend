import { StyleSheet, Text, View } from 'react-native';
import CardList from './components/CardList';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import Animal from './components/Animal';


function HomeScreen() {

  // Animal detail page states
  const [showAnimal, setShowAnimal] = useState(false)
  const [animalProps, setAnimalProps] = useState({})

  return (
    <View style={styles.cardListContainer}>
      {
        showAnimal ? <Animal {...animalProps} setShowAnimal={setShowAnimal}/> :
        <CardList setAnimalProps={setAnimalProps} setShowAnimal={setShowAnimal}/>
      }
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-location'
                : 'ios-location-outline';
            } else if (route.name === 'Discover') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'teal',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={SettingsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  cardListContainer: {
      flex: 1,
  }
})