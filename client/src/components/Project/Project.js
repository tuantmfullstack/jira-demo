import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { IoEye, IoSettings, IoTrash } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteProjectThunk,
  getAllProjectsThunk,
} from '../../redux/projectSlice.js';
import { projectsSelector } from '../../redux/selectors.js';
import useNotification from '../hook/useNotification.js';

const Project = () => {
  const dispatch = useDispatch();
  const projects = useSelector(projectsSelector);
  const { sendNotification } = useNotification();

  useEffect(() => {
    sendNotification(dispatch(getAllProjectsThunk()));
  }, []);

  const deleteProjectHandler = (id) => {
    sendNotification(dispatch(deleteProjectThunk(id)));
  };

  return (
    <>
      <Flex width='100vw' height='100vh' alignItems='center' direction='column'>
        <Box width='80vw' margin='36px 0'>
          <Link to='/projects/createProject'>
            <Flex justify='flex-end'>
              <Button>Create project</Button>
            </Flex>
          </Link>
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {projects.map((project) => (
                  <Tr key={project.id}>
                    <Td>{project.name}</Td>
                    <Td>{project.description}</Td>
                    <Td>{project.category}</Td>
                    <Td>
                      <Flex gap='24px'>
                        <Link to={`${project.id}`}>
                          <Icon
                            as={IoEye}
                            width='20px'
                            height={'20px'}
                            style={{ cursor: 'pointer' }}
                          />
                        </Link>
                        <Box>
                          <Icon
                            as={IoTrash}
                            width='20px'
                            height={'20px'}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              deleteProjectHandler(project.id);
                            }}
                          />
                        </Box>
                        <Link to={`${project.id}/settings`}>
                          <Icon
                            as={IoSettings}
                            width='20px'
                            height={'20px'}
                            style={{ cursor: 'pointer' }}
                          />
                        </Link>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
};

export default Project;
