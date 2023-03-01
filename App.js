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
import { AuthContext, AuthContextProvider } from "./store/auth-context";
import { useCallback, useContext, useEffect, useState } from "react";
import AccountScreen from "./screens/AccountScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
          } else if (route.name === "Account") {
            iconName = focused ? "person-circle" : "person-circle-outline";
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
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [appLoading, setAppLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  // Auto login if token in storage
  useEffect(() => {
    async function fetchToken() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait second on startup
        const storedToken = await AsyncStorage.getItem("token");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        if (storedToken && storedRefreshToken) {
          authCtx.authenticate(storedToken, storedRefreshToken);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppLoading(false);
      }
    }
    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!appLoading) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appLoading]);

  if (appLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ width: "100%", height: "100%" }}>
      <Navigation></Navigation>
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
