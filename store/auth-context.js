import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({
  token: '',
  refreshToken: '',
  isAuthenticated: false,
  authenticate: (token, refreshToken) => {},
  logout: () => {},
})

function AuthContextProvider({children}) {

  const [authToken, setAuthToken] = useState()
  const [refreshToken, setRefreshToken] = useState()

  function authenticate(token, refreshToken) {

    // Set token states
    setAuthToken(token)
    setRefreshToken(refreshToken)

    // Store tokens on async storage
    AsyncStorage.setItem('token', token)
    AsyncStorage.setItem('refreshToken', refreshToken)
  }

  function logout() {

    // Set token states
    setAuthToken(null)
    setRefreshToken(null)

    // Remove tokens from async storage
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('refreshToken')
  }

  const authValue = {
    token: authToken,
    refreshToken: refreshToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthContextProvider}