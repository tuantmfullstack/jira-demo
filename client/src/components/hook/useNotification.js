import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useNotification = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const sendToast = ({ title, description, status, duration }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: 'top-right',
    });
  };

  const sendNotification = (fn, navigation = false) => {
    fn.then((res) => {
      if (res.error) throw res;

      const message = res.payload.message;
      if (message) {
        sendToast({
          title: 'Success',
          description: message,
          status: 'success',
          duration: 4000,
        });

        if (navigation) {
          return setTimeout(() => {
            navigate('/projects');
          }, 500);
        }
      }
    }).catch((res) => {
      const message = res.payload.response.data.message;
      sendToast({
        title: 'Something went wrong!',
        description: message || res.message || res.data.message,
        status: 'error',
        duration: 8000,
      });

      if (message.includes('login')) {
        return setTimeout(() => {
          navigate('/login');
        }, 100);
      }

      if (message.includes('ID')) {
        setTimeout(() => {
          navigate('/projects');
        }, 100);
      }
    });
  };

  return { sendNotification };
};

export default useNotification;
