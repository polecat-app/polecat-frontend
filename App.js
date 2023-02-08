import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "./store/locationContext";
import HomeScreen from "./screens/HomeScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import SearchScreen from "./screens/SearchScreen";
import { Colors } from "./styles/Colors";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-location" : "ios-location-outline";
              } else if (route.name === "Search") {
                iconName = focused ? "ios-search" : "ios-search-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-settings" : "ios-settings-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.AccentPrimary,
            tabBarInactiveTintColor: Colors.Inactive,
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
