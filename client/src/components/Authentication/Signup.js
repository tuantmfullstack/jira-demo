import { Box, Button, Flex, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupThunk } from '../../redux/authSlice.js';
import useNotification from '../hook/useNotification.js';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const signupHandler = () => {
    const user = { name, email, password, passwordConfirm };
    sendNotification(dispatch(signupThunk(user)), true);

    setEmail('');
    setName('');
    setPassword('');
    setPasswordConfirm('');
  };

  return (
    <Flex width='100vw' height='100vh' justify='center' bg='#e9ecef'>
      <Box width='40vw' margin='36px 0' bg='#fff' borderRadius='24px' p='24px'>
        <Box
          textTransform={'uppercase'}
          fontWeight='600'
          fontSize='32px'
          textAlign={'center'}
        >
          Jira Signup
        </Box>
        <Box marginTop='8px'>
          <FormLabel>Name</FormLabel>
          <Input onChange={nameChangeHandler} />
        </Box>
        <Box marginTop='8px'>
          <FormLabel>Email</FormLabel>
          <Input onChange={emailChangeHandler} />
        </Box>
        <Box marginTop='8px'>
          <FormLabel>Password</FormLabel>
          <Input onChange={passwordChangeHandler} type={'password'} />
        </Box>
        <Box marginTop='8px'>
          <FormLabel>Password Confirm</FormLabel>
          <Input onChange={passwordConfirmChangeHandler} type={'password'} />
        </Box>

        <Button
          colorScheme='blue'
          width='100%'
          marginTop='12px'
          onClick={signupHandler}
        >
          Sign up
        </Button>
        <Link to='/login'>
          <Box
            fontSize='14px'
            fontWeight='600'
            textAlign={'center'}
            marginTop='4px'
          >
            Have account? Login here
          </Box>
        </Link>
      </Box>
    </Flex>
  );
};

export default Signup;
