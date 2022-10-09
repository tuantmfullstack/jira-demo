import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usersReducer } from '../../redux/selectors.js';
import { createTodoThunk } from '../../redux/todoSlice.js';
import RichTextEditor from '../Todos/RichTextEditor.js';
import MenuUI from '../UI/MenuUI.js';
import PriorityOptions from '../UI/PriorityOptions.js';
import UserOptions from '../UI/UserOptions.js';
import useNotification from '../hook/useNotification.js';

const TaskModal = ({ isOpen, onClose }) => {
  const [issueType, setIssueType] = useState('STORY');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('Write description here');
  const [reporters, setReporters] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState('highest');
  const users = useSelector(usersReducer);
  const dispatch = useDispatch();
  const params = useParams();
  const { sendNotification } = useNotification();

  const priorityChangeHandler = (e) => {
    setPriority(e.target.value);
  };

  const getTextEditor = (value) => {
    setDescription(value);
  };

  const getIssueType = (value) => {
    setIssueType(value);
  };

  const summaryChangeHandler = (e) => {
    setSummary(e.target.value);
  };

  const getAssigneeIds = (value) => {
    setAssignees(value);
  };

  const getReporterIds = (value) => {
    setReporters(value);
  };

  const createTodoHandler = () => {
    const newTodo = {
      issueType,
      title: summary,
      description,
      reporters: reporters.length > 0 ? reporters : [users[0].id],
      assignees: assignees.length > 0 ? assignees : [users[0].id],
      priority,
      status: 'backlog',
      projectID: params.id,
    };

    sendNotification(dispatch(createTodoThunk(newTodo)));
    onClose();

    setIssueType('STORY');
    setSummary('');
    setDescription('Write description here');
    setAssignees([]);
    setReporters([]);
    setPriority('highest');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth='80vw' p='24px 16px'>
        <Box fontSize='24px'>Create issue</Box>
        <Box marginTop='36px'>
          <Box fontWeight='600' fontSize='14px'>
            Issue type
          </Box>
          <MenuUI issueType={issueType} getIssueType={getIssueType} />
        </Box>
        <Divider margin='16px 0' />
        <Box fontWeight='600' fontSize='14px'>
          <Box>Short summary</Box>
          <Input onChange={summaryChangeHandler} value={summary} />
        </Box>
        <Box fontWeight='600' fontSize='14px' marginTop='12px'>
          <Box>Description</Box>
          <RichTextEditor
            show
            getTextEditor={getTextEditor}
            data={description}
          />
        </Box>
        <Box fontWeight='600' fontSize='14px' marginTop='12px'>
          <Box>Reporter</Box>
          <UserOptions getUserIds={getReporterIds} />
        </Box>
        <Box fontWeight='600' fontSize='14px' marginTop='12px'>
          <Box>Asignees</Box>
          <UserOptions getUserIds={getAssigneeIds} />
        </Box>
        <Box fontWeight='600' fontSize='14px' marginTop='12px'>
          <Box>Priority</Box>
          <PriorityOptions
            defaultValue={priority}
            onChange={priorityChangeHandler}
          />
        </Box>
        <Flex width='100%' justify='flex-end' margin='12px 0 0' gap='8px'>
          <Button colorScheme='blue' onClick={createTodoHandler}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
