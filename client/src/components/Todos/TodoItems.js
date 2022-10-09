import { Box } from '@chakra-ui/react';
import Todo from './Todo.js';

const TodoItems = ({ header, todos }) => {
  const datas = todos.filter(
    (todo) => todo.status === header.split(' ').join('-')
  );

  return (
    <Box
      textTransform={'uppercase'}
      bg='#f1f3f5'
      flex={1}
      height='70vh'
      p='4px 8px'
      fontSize='14px'
      fontWeight='600'
    >
      {header}
      <Box>
        {datas.map((data) => (
          <Todo key={data.id} data={data} />
        ))}
      </Box>
    </Box>
  );
};

export default TodoItems;
