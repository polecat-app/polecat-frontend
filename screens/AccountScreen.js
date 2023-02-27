import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../store/auth-context";


function AccountScreen() {

  const authCtx = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={authCtx.logout} style={styles.logoutButton}>
        <Text>Logout</Text>
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