import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles/Colors";
import { SavedScreen } from "./screens/SavedScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-location" : "ios-location-outline";
            } else if (route.name === "Saved") {
              iconName = focused ? "ios-bookmark" : "ios-bookmark-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.AccentPrimary,
          tabBarInactiveTintColor: Colors.Inactive,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarOptions: {
            showLabel: false
        }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
