import { Avatar, Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { IoBookmark, IoBug, IoCheckbox } from 'react-icons/io5';
import TodoModal from './TodoModal.js';

const Todo = ({ data }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const statusMap = {
    STORY: { icon: IoBookmark, color: 'blue' },
    BUG: { icon: IoBug, color: 'red' },
    TASK: { icon: IoCheckbox, color: 'green' },
  };

  return (
    <Box
      bg='#fff'
      m='8px 6px'
      p='8px'
      borderRadius='8px'
      _hover={{ bg: '#dee2e6', cursor: 'pointer' }}
      onClick={onOpen}
    >
      <Text
        textTransform={'none'}
        fontWeight='400'
        fontSize='16px'
        lineHeight={1.3}
      >
        {data.title}
      </Text>
      <Flex justify='space-between' align='center' marginTop='8px'>
        <Flex>
          <Icon
            as={statusMap[data.issueType].icon}
            color={statusMap[data.issueType].color}
            width='20px'
            height='20px'
          />
          <Box marginLeft='4px' fontSize='12px' fontWeight='600'>
            {data.priority.toUpperCase()}
          </Box>
        </Flex>
        <Avatar url={data.avatar} size='xs' />
      </Flex>
      <TodoModal isOpen={isOpen} onClose={onClose} data={data} />
    </Box>
  );
};

export default Todo;
