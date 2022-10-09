import { Avatar, Box, Button, useDisclosure } from '@chakra-ui/react';
import {
  FiBook,
  FiCodesandbox,
  FiCreditCard,
  FiFileText,
  FiPlus,
  FiServer,
  FiTrendingUp,
  FiTruck,
  FiLogOut,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ColumnItem from './ColumnItem.js';
import TaskModal from './TaskModal.js';
import Cookies from 'universal-cookie';
import useNotification from '../hook/useNotification.js';

const FirstColumn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sendNotification } = useNotification();

  const logoutHandler = () => {
    const cookies = new Cookies();
    cookies.set('token', '');

    sendNotification(
      Promise.resolve({
        payload: { message: 'Logout successfully.' },
      })
    );
  };

  return (
    <Box padding='12px 20px' bg='#f1f3f5' width='20vw' height='100vh'>
      <Link to='/me'>
        <Button
          leftIcon={
            <Avatar src={`${localStorage.getItem('avatar')}`} size={'md'} />
          }
          p='24px'
        >
          {localStorage.getItem('name')}
        </Button>
      </Link>
      <ColumnItem icon={FiCreditCard} text='Board' special />
      <ColumnItem icon={FiPlus} text='Create task' onClick={onOpen} />
      <Link to='/projects'>
        <ColumnItem icon={FiBook} text='Projects' />
        <ColumnItem icon={FiLogOut} text='Logout' onClick={logoutHandler} />
      </Link>
      <hr className='horizontal-line' />
      <ColumnItem icon={FiTruck} text='Releases' notAllowed />
      <ColumnItem icon={FiServer} text='Issues' notAllowed />
      <ColumnItem icon={FiFileText} text='Pages' notAllowed />
      <ColumnItem icon={FiTrendingUp} text='Reports' notAllowed />
      <ColumnItem icon={FiCodesandbox} text='Components' notAllowed />
      <TaskModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default FirstColumn;
