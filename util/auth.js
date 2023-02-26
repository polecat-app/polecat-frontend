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
  return token
}

async function createUser(email, password) {
  return authenticate("signUp", email, password)
}

async function loginUser(email, password) {
  return authenticate("signInWithPassword", email, password)
}

export {createUser, loginUser}