import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./PolecatAPI";

async function authenticate(mode, email, password) {
  const url = `/auth/${mode}`;
  const response = await api.post(url, {
    email: email,
    password: password,
  });
  const token = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  return [token, refreshToken];
}

async function refreshAuthentication() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const url = `/auth/refresh`;
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  const token = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;
  return [token, newRefreshToken];
}

async function createUser(email, password) {
  return authenticate("signup", email, password);
}

async function loginUser(email, password) {
  return authenticate("login", email, password);
}

export { createUser, loginUser, refreshAuthentication };
