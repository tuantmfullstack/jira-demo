import { Select } from '@chakra-ui/react';

const PriorityOptions = ({ defaultValue, onChange }) => {
  return (
    <Select defaultValue={defaultValue} onChange={onChange}>
      <option value='highest'>Highest</option>
      <option value='high'>High</option>
      <option value='medium'>Medium</option>
      <option value='low'>Low</option>
      <option value='lowest'>Lowest</option>
    </Select>
  );
};

export default PriorityOptions;
