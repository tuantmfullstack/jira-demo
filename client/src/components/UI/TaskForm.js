import { Box, Button, Flex, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskForm = ({ project, getData }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [category, setCategory] = useState(project.category);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const saveDataHandler = () => {
    const data = { name, description, category };
    getData(data);
  };

  return (
    <Flex width='100vw' height='100vh' justify='center'>
      <Box width='80vw' margin='24px'>
        <Box fontWeight='600' fontSize='24px'>
          Project details
        </Box>
        <Box marginTop='12px'>
          <Box>Name</Box>
          <Input marginTop='8px' value={name} onChange={nameChangeHandler} />
        </Box>
        <Box marginTop='12px'>
          <Box>Description</Box>
          <Input
            marginTop='8px'
            value={description}
            onChange={descriptionChangeHandler}
          />
        </Box>
        <Box marginTop='12px'>
          <Box>Category</Box>
          <Select
            marginTop='8px'
            value={category}
            onChange={categoryChangeHandler}
          >
            <option value='software'>Software</option>
            <option value='marketing'>Marketing</option>
            <option value='bussiness'>Bussiness</option>
          </Select>
        </Box>
        <Flex justify='flex-end' marginTop='16px' gap='12px'>
          <Button colorScheme='blue' onClick={saveDataHandler}>
            Save changes
          </Button>
          <Link to='/'>
            <Button>Cancel</Button>
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default TaskForm;
