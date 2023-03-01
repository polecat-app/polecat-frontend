import { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TopBarContainer from "../components/TopBarContainer";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import textStyles from "../styles/TextStyles";
import { refreshAuthentication } from "../util/auth";

function AccountScreen() {
  const authCtx = useContext(AuthContext);

  // THIS WILL HAVE TO HAPPEN ON 401 RESPONSES
  async function refresh() {
    const [token, refreshToken] = await refreshAuthentication(
      authCtx.refreshToken
    );
    authCtx.authenticate(token, refreshToken);
  }

  return (
    <View style={styles.container}>
      <TopBarContainer>
        <Text style={[styles.row, textStyles.overlayBold]}>Account</Text>
      </TopBarContainer>
      <View style={styles.content}>
        <TouchableOpacity onPress={authCtx.logout} style={styles.button}>
          <Text style={textStyles.basicAccentBold}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={refresh} style={styles.button}>
          <Text style={textStyles.basicAccentBold}>Refresh token</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: Colors.Primary,
    width: "100%",
    height: "100%",
  },
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    width: "80%",
    height: 20,
  },
  button: {
    padding: Offsets.DefaultMargin,
    backgroundColor: Colors.AccentSecondary,
    marginHorizontal: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Offsets.BorderRadius,
  },
});

export default AccountScreen;
