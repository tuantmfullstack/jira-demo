import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex width='100vw' height='100vh' justify='center' align='center'>
      <Box textAlign={'center'}>
        <Box fontWeight='700' fontSize='100px' lineHeight={1}>
          404
        </Box>
        <Box
          fontWeight='500'
          fontSize='50px'
          textTransform={'uppercase'}
          lineHeight={1.3}
        >
          Not found
        </Box>
        <Box fontSize='20px' margin='12px 0'>
          This page doesn't exist or was removed!
        </Box>
        <Link to='/'>
          <Button>Back to Home</Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default NotFound;
