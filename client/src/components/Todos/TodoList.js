import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosRemaining } from '../../redux/selectors.js';
import { getAllTodosThunk } from '../../redux/todoSlice.js';
import { getAllUsersThunk } from '../../redux/userSlice.js';
import projectSlice from '../../redux/projectSlice.js';
import useNotification from '../hook/useNotification.js';
import TodoItems from './TodoItems.js';
import { useParams } from 'react-router-dom';

const TodoList = () => {
  const headers = ['backlog', 'select for development', 'in progress', 'done'];
  const todos = useSelector(todosRemaining);
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();
  const params = useParams();

  useEffect(() => {
    sendNotification(dispatch(getAllTodosThunk()));
    sendNotification(dispatch(getAllUsersThunk()));
    dispatch(projectSlice.actions.setProjectID(params.id));
  }, []);

  return (
    <Flex width='100%' gap={'16px'}>
      {headers.map((header, idx) => (
        <TodoItems header={header} key={idx} todos={todos} />
      ))}
    </Flex>
  );
};

export default TodoList;
