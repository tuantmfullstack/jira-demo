import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoBookmark, IoBug, IoCheckbox } from 'react-icons/io5';

const MenuUI = ({ issueType = 'STORY', getIssueType, id = '' }) => {
  const [buttonTitle, setButtonTitle] = useState(issueType);
  const statusMap = {
    STORY: { icon: IoBookmark, color: 'blue' },
    BUG: { icon: IoBug, color: 'red' },
    TASK: { icon: IoCheckbox, color: 'green' },
  };

  const menuItemHandler = (e) => {
    setButtonTitle(e.target.textContent);
    getIssueType(e.target.textContent);
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton>
        <Flex justify='center' align='center'>
          <Icon
            as={statusMap[buttonTitle].icon}
            width='20px'
            height={'20px'}
            color={statusMap[buttonTitle].color}
          />
          <Box marginLeft='4px'>{buttonTitle + `${id ? `-${id}` : ''}`}</Box>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={menuItemHandler}>
          <Icon as={statusMap['STORY'].icon} color={statusMap['STORY'].color} />
          <Box marginLeft='4px'>STORY</Box>
        </MenuItem>
        <MenuItem onClick={menuItemHandler}>
          <Icon as={statusMap['BUG'].icon} color={statusMap['BUG'].color} />
          <Box marginLeft='4px'>BUG</Box>
        </MenuItem>
        <MenuItem onClick={menuItemHandler}>
          <Icon as={statusMap['TASK'].icon} color={statusMap['TASK'].color} />
          <Box marginLeft='4px'>TASK</Box>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuUI;
