import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProjectThunk,
  updateProjectThunk,
} from '../../redux/projectSlice.js';
import { projectSelector } from '../../redux/selectors.js';
import useNotification from '../hook/useNotification.js';
import Form from '../UI/TaskForm.js';

const Settting = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const project = useSelector(projectSelector);
  const { sendNotification } = useNotification();

  useEffect(() => {
    sendNotification(dispatch(getProjectThunk(params.id)));
  }, []);

  const saveDataHandler = (data) => {
    sendNotification(
      dispatch(updateProjectThunk({ id: params.id, data })),
      true
    );
  };

  return (
    <Box>
      {Object.keys(project).length > 0 && (
        <Form getData={saveDataHandler} project={project} />
      )}
    </Box>
  );
};

export default Settting;
