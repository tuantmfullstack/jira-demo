import { Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { usersReducer } from '../../redux/selectors.js';

const UserOptions = ({ defaultValue = [], getUserIds }) => {
  // console.log({ defaultValue });

  const users = useSelector(usersReducer);
  const options = users.map((user) => ({
    value: user.email,
    label: user.email,
    id: user.id,
  }));

  const defaultUsers = users
    .filter((user) => defaultValue.includes(user.id))
    .map((user) => ({ value: user.email, label: user.email, id: user.id }));

  const selectChangeHandler = (selectedUsers) => {
    if (selectedUsers.length > 0)
      getUserIds(selectedUsers.map((user) => user.id));
    else getUserIds(defaultValue);
  };

  return (
    <Box>
      <Select
        isMulti
        name='colors'
        options={options}
        placeholder='Select users'
        closeMenuOnSelect={false}
        size='md'
        onChange={selectChangeHandler}
        defaultValue={defaultUsers}
      />
    </Box>
  );
};

export default UserOptions;
