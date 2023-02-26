import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DiscoverScreen from "./screens/DiscoverScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles/Colors";
import SavedScreen from "./screens/SavedScreen";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { AuthContextProvider } from "./store/auth-context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        animationEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Discover") {
            iconName = focused ? "compass" : "compass-outline";
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
          showLabel: false,
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Navigation />
    </>
  );
}
