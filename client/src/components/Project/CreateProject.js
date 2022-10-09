import { useDispatch } from 'react-redux';
import { createProjectThunk } from '../../redux/projectSlice.js';
import useNotification from '../hook/useNotification.js';
import Form from '../UI/TaskForm.js';

const CreateProject = () => {
  const dispatch = useDispatch();
  const { sendNotification } = useNotification();

  const createProjectHandler = (data) => {
    sendNotification(dispatch(createProjectThunk(data)), true);
  };

  const project = {
    name: '',
    description: '',
    category: 'software',
  };

  return <Form getData={createProjectHandler} project={project} />;
};

export default CreateProject;
