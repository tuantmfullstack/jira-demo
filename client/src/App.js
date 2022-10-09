import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './components/Authentication/Login.js';
import Me from './components/Authentication/Me.js';
import Signup from './components/Authentication/Signup.js';
import CreateProject from './components/Project/CreateProject.js';
import Project from './components/Project/Project.js';
import ProjectItem from './components/Project/ProjectItem.js';
import Settting from './components/Project/Settting.js';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import NotFound from './components/Pages/NotFound.js';
import Home from './components/Pages/Home.js';

function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={isLoggedIn ? <Navigate to='/projects' /> : <Home />}
        />
        <Route
          path='/login'
          element={isLoggedIn ? <Navigate to='/projects' /> : <Login />}
        />
        <Route
          path='/signup'
          element={isLoggedIn ? <Navigate to='/projects' /> : <Signup />}
        />
        <Route path='/projects' element={<Project />} />
        <Route path='/projects/:id' element={<ProjectItem />} />
        <Route path='/projects/:id/settings' element={<Settting />} />
        <Route path='/projects/createProject' element={<CreateProject />} />
        <Route path='/me' element={<Me />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
