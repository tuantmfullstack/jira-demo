import { Box, Button } from '@chakra-ui/react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig.js';
import Cookies from 'universal-cookie';
import useNotification from '../hook/useNotification.js';
import { FcGoogle } from 'react-icons/fc';

const LoginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const cookies = new Cookies();
  const { sendNotification } = useNotification();

  const signInHandler = () => {
    signInWithRedirect(auth, provider);
  };

  (async () => {
    const result = await getRedirectResult(auth);

    console.log({ result });

    if (result) {
      cookies.set('token', result.user.accessToken);
      localStorage.setItem('email', result.user.email);
      localStorage.setItem('name', result.user.displayName);
      localStorage.setItem('avatar', result.user.photoURL);

      sendNotification(
        Promise.resolve({
          payload: { message: 'Login with google successfully!' },
        }),
        true
      );
    }
  })();

  return (
    <Box marginTop='8px'>
      <Button leftIcon={<FcGoogle />} width='100%' onClick={signInHandler}>
        Login with google
      </Button>
    </Box>
  );
};

export default LoginWithGoogle;
