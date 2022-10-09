import { Flex } from '@chakra-ui/react';
import FirstColumn from '../Column/FirstColumn.js';
import SecondColumn from '../Column/SecondColumn.js';

const ProjectItem = () => {
  return (
    <>
      <Flex>
        <FirstColumn />
        <SecondColumn />
      </Flex>
    </>
  );
};

export default ProjectItem;
