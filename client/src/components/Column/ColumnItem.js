import { Flex, Icon, Text } from '@chakra-ui/react';

const ColumnItem = ({ icon, text, notAllowed, onClick, special }) => {
  const taskClickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <Flex
      align='center'
      width='100%'
      _hover={{
        bg: '#dee2e6',
        borderRadius: '8px',
        cursor: `${notAllowed ? 'not-allowed' : 'pointer'}`,
      }}
      padding='8px'
      marginTop='4px'
      onClick={taskClickHandler}
    >
      <Icon
        as={icon}
        width='22px'
        height='22px'
        color={special ? 'blue' : ''}
      />
      <Text marginLeft='16px' color={special ? 'blue' : ''}>
        {text}
      </Text>
    </Flex>
  );
};

export default ColumnItem;
