import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { loginUser } from '../util/auth';

function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authCtx = useContext(AuthContext)

  async function loginHandler({email, password}) {
    setIsAuthenticating(true)
    try {
      const token = await loginUser(email, password)
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert("Authentication failed!", "Please check your credentials or try again later.")
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loggin in..."/>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
