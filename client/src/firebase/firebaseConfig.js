import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCyugg6ivZer9m0k8O0KItXCaVESLEegmQ',
  authDomain: 'jira-projects-9f8b0.firebaseapp.com',
  projectId: 'jira-projects-9f8b0',
  storageBucket: 'jira-projects-9f8b0.appspot.com',
  messagingSenderId: '857060981343',
  appId: '1:857060981343:web:9715fa4a18a6d869def9ea',
};

export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
