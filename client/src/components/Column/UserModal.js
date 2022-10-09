import {
  Avatar,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterSlice from '../../redux/filterSlice.js';
import { usersFilterReducer, usersReducer } from '../../redux/selectors.js';

const UserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(usersReducer);
  const checkedUsers = useSelector(usersFilterReducer);

  const checkboxChangeHandler = (emails) => {
    dispatch(filterSlice.actions.filterUsers(emails));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={'40vw'}>
        <ModalCloseButton />
        <ModalBody margin='12px 24px'>
          <CheckboxGroup
            onChange={checkboxChangeHandler}
            defaultValue={checkedUsers}
          >
            {users.map((user) => (
              <Checkbox
                key={user.id}
                style={{ display: 'flex', marginBottom: '12px' }}
                value={user.email}
              >
                <Flex align='center' gap={'12px'} marginLeft='8px'>
                  <Avatar src={user.avatar} size='sm' />
                  <Box>{`${user.name} (${user.email})`}</Box>
                </Flex>
              </Checkbox>
            ))}
          </CheckboxGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
