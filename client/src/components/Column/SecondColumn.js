import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import filterSlice from '../../redux/filterSlice.js';
import TodoList from '../Todos/TodoList.js';
import UserModal from './UserModal.js';

const SecondColumn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const searchChangeHandler = (e) => {
    dispatch(filterSlice.actions.searchTodo(e.target.value));
  };

  return (
    <Box p='12px 20px'>
      <Box fontWeight='600' fontSize='24px'>
        Project 1
      </Box>
      <Box>This is the first project</Box>
      <Flex margin='12px 12px 12px 0' width='80vw'>
        <InputGroup width='300px'>
          <InputLeftElement children={<FiSearch />} />
          <Input onChange={searchChangeHandler} />
        </InputGroup>
        <Button margin='0 12px' onClick={onOpen}>
          Select users
        </Button>
        <UserModal isOpen={isOpen} onClose={onClose} />
        <Button variant={'ghost'}>Only my issues</Button>
      </Flex>
      <TodoList />
    </Box>
  );
};

export default SecondColumn;
