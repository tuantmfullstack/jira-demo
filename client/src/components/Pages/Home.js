import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Flex
      width='100vw'
      height='100vh'
      justify='center'
      align='center'
      direction='column'
    >
      <Box fontWeight='600' fontSize='60px' lineHeight={1}>
        Welcome to
      </Box>
      <Box fontWeight='700' fontSize='80px' lineHeight={1.2}>
        JIRA Kanban Board
      </Box>
      <Link to='/login'>
        <Button width='40vw' colorScheme='blue' marginTop='36px'>
          Login
        </Button>
      </Link>
      <Link to='/signup'>
        <Button width='40vw' marginTop='12px'>
          Sign up
        </Button>
      </Link>
    </Flex>
  );
};

export default Home;
