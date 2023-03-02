import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { refreshAuthentication } from "../util/auth";

const AuthContext = createContext({
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  authenticate: (token, refreshToken) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [intervalRef, setIntervalRef] = useState();

  async function refreshAuth() {
    console.log("refreshing", authToken);
    const response = await refreshAuthentication();
    const [newToken, newRefreshToken] = response;
    authenticate(newToken, newRefreshToken);
  }

  function authenticate(token, refreshToken) {
    // Set token
    setAuthToken(token);

    // Store tokens on async storage
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    // Set token
    setAuthToken(null);

    // Remove tokens from async storage
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
  }

  // Refresh authentication every interval
  useEffect(() => {
    clearInterval(intervalRef);
    if (authToken) {
      const interval = setInterval(refreshAuth, 20000);
      setIntervalRef(interval);
    }
  }, [authToken]);

  const authValue = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
