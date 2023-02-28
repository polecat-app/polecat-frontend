import axios from 'axios'
import { GOOGLE_API_KEY } from 'react-native-dotenv'


async function authenticate(mode, email, password) {

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${GOOGLE_API_KEY}`
  const response = await axios.post(
    url,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  )
  const token = response.data.idToken
  const refreshToken = response.data.refreshToken
  return [token, refreshToken]
}

async function refreshAuthentication(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${GOOGLE_API_KEY}`
  const response = await axios.post(
    url,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }
  )
  const token = response.data.id_token
  const newRefreshToken = response.data.refresh_token
  return [token, newRefreshToken]
}

async function createUser(email, password) {
  return authenticate("signUp", email, password)
}

async function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password)
}

export {createUser, loginUser, refreshAuthentication}