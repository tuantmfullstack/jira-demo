import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteTodoThunk, updateTodoThunk } from '../../redux/todoSlice.js';
import useNotification from '../hook/useNotification.js';
import MenuUI from '../UI/MenuUI.js';
import PriorityOptions from '../UI/PriorityOptions.js';
import UserOptions from '../UI/UserOptions.js';
import RichTextEditor from './RichTextEditor.js';

const TodoModal = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const [textEditor, setTextEditor] = useState(data.description);
  const [title, setTitle] = useState(data.title);
  const [status, setStatus] = useState(data.status);
  const [priority, setPriority] = useState(data.priority);
  const [assignees, setAssignees] = useState([]);
  const [reporters, setReporters] = useState([]);
  const [issueType, setIssueType] = useState(data.issueType);
  const { sendNotification } = useNotification();

  const saveTodoHandler = () => {
    const newTodo = {
      title,
      description: textEditor,
      status,
      assignees,
      reporters,
      priority,
      issueType,
    };
    sendNotification(dispatch(updateTodoThunk({ id: data.id, newTodo })));
    onClose();
  };

  const getAssigneeIds = (value) => {
    setAssignees([...value]);
  };

  const getReporterIds = (value) => {
    console.log(value);
    setReporters([...value]);
  };

  const deleteTodoHandler = () => {
    sendNotification(dispatch(deleteTodoThunk(data.id)));
    onClose();
  };

  const getTextEditor = (value) => {
    setTextEditor(value);
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
  };

  const priorityChangeHandler = (e) => {
    setPriority(e.target.value);
  };

  const getIssueType = (value) => {
    setIssueType(value);
  };

  useEffect(() => {
    if (data.assignees.length > 0) {
      setAssignees(data.assignees.map((el) => el.id));
      setReporters(data.reporters.map((el) => el.id));
    }
  }, [data]);

  // console.log({ assignees, reporters });

  return (
    <>
      {assignees.length > 0 && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent minWidth='80vw' minHeight={'80vh'} p='24px 16px'>
            <Flex align='center' marginLeft='12px'>
              <Box>
                <MenuUI
                  getIssueType={getIssueType}
                  issueType={data.issueType}
                  id={data.id}
                />
              </Box>
            </Flex>
            <Flex>
              <Box flex={1}>
                <ModalHeader fontWeight='600'>
                  <Input defaultValue={title} onChange={titleChangeHandler} />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <Box fontWeight='600' marginBottom='8px'>
                      Description
                    </Box>
                    <RichTextEditor
                      data={data.description}
                      getTextEditor={getTextEditor}
                    />
                  </Box>
                </ModalBody>
              </Box>
              <Box width='350px'>
                <Box>
                  <Box
                    textTransform={'uppercase'}
                    fontSize='14px'
                    fontWeight='600'
                    marginBottom='8px'
                  >
                    Status
                  </Box>
                  <Select defaultValue={status} onChange={statusChangeHandler}>
                    <option value='backlog'>BACKLOG</option>
                    <option value='select-for-development'>
                      SELECT FOR DEVELOPMENT
                    </option>
                    <option value='in-progress'>IN PROGRESS</option>
                    <option value='done'>DONE</option>
                  </Select>
                </Box>
                <Box marginTop='20px'>
                  <Box
                    textTransform={'uppercase'}
                    fontSize='14px'
                    fontWeight='600'
                    marginBottom='8px'
                  >
                    Assignees
                  </Box>
                  <UserOptions
                    defaultValue={assignees}
                    getUserIds={getAssigneeIds}
                  />
                </Box>
                <Box marginTop='20px'>
                  <Box
                    textTransform={'uppercase'}
                    fontSize='14px'
                    fontWeight='600'
                    marginBottom='8px'
                  >
                    Reporters
                  </Box>
                  <UserOptions
                    defaultValue={reporters}
                    getUserIds={getReporterIds}
                  />
                </Box>
                <Box marginTop='20px'>
                  <Box
                    textTransform={'uppercase'}
                    fontSize='14px'
                    fontWeight='600'
                    marginBottom='8px'
                  >
                    priority
                  </Box>
                  <PriorityOptions
                    defaultValue={priority}
                    onChange={priorityChangeHandler}
                  />
                </Box>
                <Box marginTop='20px'>
                  <Text
                    textTransform={'uppercase'}
                    fontSize='14px'
                    fontWeight='600'
                    marginBottom='8px'
                  >
                    Time tracking
                  </Text>
                  <Flex justify='space-between' align='center' gap={'8px'}>
                    <Icon as={BsClock} fontWeight='600' fontSize='18px' />
                    <Box
                      width='calc(100% - 20px)'
                      height='8px'
                      bg='blue'
                      borderRadius='12px'
                      flex={1}
                    />
                  </Flex>
                </Box>
                <Box marginTop='20px'>
                  <Text fontSize='16px' color={'#333'}>
                    Created at 8 days ago
                  </Text>
                  <Text fontSize='16px' color={'#333'}>
                    Updated at 8 days ago
                  </Text>
                </Box>
              </Box>
            </Flex>
            <ModalFooter>
              <Button variant='ghost' onClick={deleteTodoHandler}>
                Delete
              </Button>
              <Button
                colorScheme='blue'
                onClick={saveTodoHandler}
                margin='0 8px'
              >
                Save
              </Button>
              <Button variant={'ghost'} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TodoModal;
