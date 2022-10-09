import { Box, Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginThunk } from '../../redux/authSlice.js';
import useNotification from '../hook/useNotification.js';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import LoginWithGoogle from './LoginWithGoogle.js';

const AuthenticationForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { sendNotification } = useNotification();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    sendNotification(dispatch(loginThunk({ email, password })), true);
  };

  return (
    <Flex
      width='100vw'
      height='100vh'
      justify='center'
      bg='#e9ecef'
      align='center'
    >
      <Box width='40vw' margin='36px 0' bg='#fff' borderRadius='24px' p='24px'>
        <Box
          textTransform={'uppercase'}
          fontWeight='600'
          fontSize='32px'
          textAlign={'center'}
        >
          Jira Login
        </Box>
        <Box marginTop='24px'>
          <FormLabel>Email</FormLabel>
          <Input onChange={emailChangeHandler} />
        </Box>
        <Box marginTop='12px'>
          <FormLabel>Password</FormLabel>
          <Input onChange={passwordChangeHandler} type={'password'} />
        </Box>
        <Button
          colorScheme='blue'
          marginTop='24px'
          width='100%'
          onClick={loginHandler}
        >
          Login
        </Button>
        <LoginWithGoogle />
        <Link to='/signup'>
          <Box
            fontSize='14px'
            fontWeight='600'
            textAlign={'center'}
            marginTop='8px'
          >
            No account? Signup here
          </Box>
        </Link>
      </Box>
    </Flex>
  );
};

export default AuthenticationForm;
