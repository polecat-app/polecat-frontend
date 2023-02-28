import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../store/auth-context";
import { refreshAuthentication } from "../util/auth";


function AccountScreen() {

  const authCtx = useContext(AuthContext)

  // THIS WILL HAVE TO HAPPEN ON 401 RESPONSES
  async function refresh() {
    const [token, refreshToken] = await refreshAuthentication(authCtx.refreshToken)
    authCtx.authenticate(token, refreshToken)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={authCtx.logout} style={styles.logoutButton}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={refresh} style={styles.logoutButton}>
        <Text>Refresh token</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  logoutButton: {
    width: "80%",
    height: 20
  }
})


export default AccountScreen