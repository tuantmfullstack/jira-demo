import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import storage from '../../firebase/firebaseConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useNotification from '../hook/useNotification.js';

const Me = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [avatarImg, setAvatarImg] = useState('');
  const navigate = useNavigate();
  const { sendNotification } = useNotification();

  const avatarChangeHandler = (e) => {
    setAvatarImg(e.target.files[0]);
    setAvatar(window.URL.createObjectURL(e.target.files[0]));
  };

  const setAvatarHandler = () => {
    if (avatarImg === '') return;
    const imageRef = ref(
      storage,
      `${localStorage.getItem('email').split('@gmail')[0]}`
    );
    (async () => {
      const snapshot = await uploadBytes(imageRef, avatarImg);
      const avatarURL = await getDownloadURL(snapshot.ref);
      localStorage.setItem('avatar', avatarURL);
    })();

    sendNotification(
      Promise.resolve({ payload: { message: 'Avatar changed.' } })
    );

    setTimeout(() => {
      navigate('/projects');
    }, 500);
  };

  return (
    <Flex
      width='100vw'
      height='100vh'
      justify='center'
      align='center'
      bg='#e9ecef'
    >
      <Tabs
        orientation='vertical'
        width='80vw'
        height='90vh'
        p='48px'
        bg='#fff'
        borderRadius='24px'
      >
        <TabList>
          <Tab fontWeight='600' fontSize='20px'>
            Avatar
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel margin='24px'>
            <Flex>
              <Box>
                <Box>Upload your avatar</Box>
                <Input
                  type='file'
                  accept='images/*'
                  marginTop='12px'
                  onChange={avatarChangeHandler}
                />
              </Box>
              <Avatar src={avatar} size='xl' marginLeft='24px' />
            </Flex>
            <Flex>
              <Button colorScheme='blue' onClick={setAvatarHandler}>
                Set avatar
              </Button>
              <Link to='/'>
                <Button marginLeft='12px'>Cancel</Button>
              </Link>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Me;
